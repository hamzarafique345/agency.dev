'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    size: number;
    color: string;
    pulse: number;
    pulseSpeed: number;
}

interface Connection {
    from: number;
    to: number;
    opacity: number;
}

export function Background3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let mouseX = 0.5;
        let mouseY = 0.5;
        let targetMouseX = 0.5;
        let targetMouseY = 0.5;
        let time = 0;

        // Configuration - visible particles with smooth movement
        const particleCount = 80;
        const particles: Particle[] = [];
        const connections: Connection[] = [];
        const maxDistance = 150;

        // Electric Blue particles - visible but subtle
        const colors = [
            'rgba(14, 165, 233, 0.8)',      // Electric Blue - primary, higher opacity
            'rgba(6, 182, 212, 0.7)',       // Cyan Blue, higher opacity
            'rgba(255, 29, 88, 0.7)',       // Vibrant Pink, higher opacity
            'rgba(139, 92, 246, 0.7)',      // Medium Purple, higher opacity
            'rgba(255, 255, 255, 0.6)',     // White, for more "light dot" effect
        ];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };

        const handleMouseMove = (e: MouseEvent) => {
            targetMouseX = e.clientX / window.innerWidth;
            targetMouseY = e.clientY / window.innerHeight;
        };

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 400 + 100,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2,
                vz: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2.5 + 1.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.03 + Math.random() * 0.04,
            });
        }

        // Draw glowing particle - visible with glow
        const drawParticle = (x: number, y: number, size: number, color: string, alpha: number) => {
            // Outer glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
            gradient.addColorStop(0, color.replace(/[\d.]+\)/, `${alpha * 0.8})`));
            gradient.addColorStop(0.5, color.replace(/[\d.]+\)/, `${alpha * 0.4})`));
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size * 3, 0, Math.PI * 2);
            ctx.fill();

            // Bright core
            const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            coreGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
            coreGradient.addColorStop(0.5, color.replace(/[\d.]+\)/, `${alpha * 0.7})`));
            coreGradient.addColorStop(1, color.replace(/[\d.]+\)/, `${alpha * 0.3})`));

            ctx.fillStyle = coreGradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        };

        // Draw connections between particles - visible lines
        const drawConnection = (x1: number, y1: number, x2: number, y2: number, opacity: number, color: string) => {
            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, color.replace(/[\d.]+\)/, `${opacity * 0.4})`));
            gradient.addColorStop(0.5, color.replace(/[\d.]+\)/, `${opacity * 0.3})`));
            gradient.addColorStop(1, color.replace(/[\d.]+\)/, `${opacity * 0.4})`));

            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 1.2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        };

        // Draw nebula effect in background - Electric Blue ambient glow
        const drawNebula = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Create multiple gradient layers - theme ambient glow
            const nebulaPoints = [
                { x: width * 0.3, y: height * 0.3, r: 500, color: 'rgba(14, 165, 233, 0.12)' }, // Electric Blue
                { x: width * 0.7, y: height * 0.6, r: 600, color: 'rgba(255, 29, 88, 0.08)' },  // Vibrant Pink
                { x: width * 0.5, y: height * 0.8, r: 550, color: 'rgba(139, 92, 246, 0.08)' }, // Medium Purple
            ];

            nebulaPoints.forEach((point) => {
                const gradient = ctx.createRadialGradient(
                    point.x + Math.sin(time * 0.3) * 50 + (mouseX - 0.5) * 100,
                    point.y + Math.cos(time * 0.2) * 30 + (mouseY - 0.5) * 100,
                    0,
                    point.x + Math.sin(time * 0.3) * 50,
                    point.y + Math.cos(time * 0.2) * 30,
                    point.r
                );
                gradient.addColorStop(0, point.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            });
        };

        const animate = () => {
            if (!ctx || !canvas) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            // Clear with fade for trail effect - pure black
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, width, height);

            time += 0.01;

            // Smooth mouse follow
            mouseX += (targetMouseX - mouseX) * 0.03;
            mouseY += (targetMouseY - mouseY) * 0.03;

            const parallaxX = (mouseX - 0.5) * 80;
            const parallaxY = (mouseY - 0.5) * 80;

            // Draw nebula background
            drawNebula();

            // Update and prepare particles data
            const screenParticles: { x: number; y: number; z: number; size: number; alpha: number; color: string; index: number }[] = [];

            particles.forEach((particle, index) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.z += particle.vz;
                particle.pulse += particle.pulseSpeed;

                // Boundary wrapping
                if (particle.x < -50) particle.x = width + 50;
                if (particle.x > width + 50) particle.x = -50;
                if (particle.y < -50) particle.y = height + 50;
                if (particle.y > height + 50) particle.y = -50;
                if (particle.z < 100) particle.z = 500;
                if (particle.z > 500) particle.z = 100;

                // Calculate screen position with perspective
                const perspective = 600 / particle.z;
                const screenX = width / 2 + (particle.x - width / 2 + parallaxX) * perspective;
                const screenY = height / 2 + (particle.y - height / 2 + parallaxY) * perspective;
                const screenSize = particle.size * perspective * (1 + Math.sin(particle.pulse) * 0.15);
                const alpha = Math.min(1, perspective * 0.6) * (0.5 + Math.sin(particle.pulse) * 0.2);

                screenParticles.push({
                    x: screenX,
                    y: screenY,
                    z: particle.z,
                    size: screenSize,
                    alpha,
                    color: particle.color,
                    index,
                });
            });

            // Sort by z-depth (back to front)
            screenParticles.sort((a, b) => b.z - a.z);

            // Draw connections first (behind particles)
            for (let i = 0; i < screenParticles.length; i++) {
                for (let j = i + 1; j < screenParticles.length; j++) {
                    const p1 = screenParticles[i];
                    const p2 = screenParticles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const opacity = (1 - dist / maxDistance) * 0.5 * Math.min(p1.alpha, p2.alpha);
                        drawConnection(p1.x, p1.y, p2.x, p2.y, opacity, p1.color);
                    }
                }
            }

            // Draw particles
            screenParticles.forEach((p) => {
                drawParticle(p.x, p.y, p.size, p.color, p.alpha);
            });

            // Draw mouse interaction effect - Electric Blue glow
            const mouseAreaX = mouseX * width;
            const mouseAreaY = mouseY * height;
            const mouseGradient = ctx.createRadialGradient(mouseAreaX, mouseAreaY, 0, mouseAreaX, mouseAreaY, 200);
            mouseGradient.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
            mouseGradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.05)');
            mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = mouseGradient;
            ctx.beginPath();
            ctx.arc(mouseAreaX, mouseAreaY, 200, 0, Math.PI * 2);
            ctx.fill();

            animationId = requestAnimationFrame(animate);
        };

        resize();
        setIsLoaded(true);
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            className="fixed inset-0 -z-20 pointer-events-none"
            style={{
                background: 'linear-gradient(135deg, #000000 0%, #000000 25%, #050505 50%, #000000 75%, #000000 100%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
        />
    );
}
