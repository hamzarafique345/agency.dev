'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

        // Create particles/dots
        interface Particle {
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            vz: number;
            size: number;
        }

        const particles: Particle[] = [];
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 150 : 250;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 2000,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                vz: Math.random() * 2 + 1,
                size: Math.random() * 0.8 + 0.5,
            });
        }

        // Draw particles/dots
        const drawParticles = () => {
            particles.forEach((particle) => {
                // Update particle position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.z -= particle.vz;

                // Reset particle when it goes too close
                if (particle.z < 1) {
                    particle.z = 2000;
                    particle.x = Math.random() * window.innerWidth;
                    particle.y = Math.random() * window.innerHeight;
                }

                // Wrap around screen
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;

                // Calculate depth-based opacity and size for 3D effect
                const depth = 1 - (particle.z / 2000);
                const scale = depth * 2.5;
                const opacity = Math.max(0.3, depth * 0.95);
                const size = particle.size * scale;

                // Draw particle with glow
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);

                // Brighter core with stronger glow for mobile visibility
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, size * 3
                );
                gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
                gradient.addColorStop(0.4, `rgba(59, 130, 246, ${opacity * 0.6})`);
                gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

                ctx.fillStyle = gradient;
                ctx.fill();
            });
        };

        // Draw nebula effect in background - Electric Blue ambient glow
        const drawNebula = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Create multiple gradient layers - only blue tones
            const nebulaPoints = [
                { x: width * 0.2, y: height * 0.2, r: 800, color: 'rgba(14, 165, 233, 0.15)' }, // Electric Blue
                { x: width * 0.8, y: height * 0.3, r: 900, color: 'rgba(14, 165, 233, 0.12)' },  // Electric Blue
                { x: width * 0.4, y: height * 0.7, r: 850, color: 'rgba(14, 165, 233, 0.1)' }, // Electric Blue
                { x: width * 0.6, y: height * 0.1, r: 750, color: 'rgba(14, 165, 233, 0.08)' },  // Electric Blue
            ];

            nebulaPoints.forEach((point) => {
                const gradient = ctx.createRadialGradient(
                    point.x + Math.sin(time * 0.2) * 80,
                    point.y + Math.cos(time * 0.15) * 60,
                    0,
                    point.x + Math.sin(time * 0.2) * 80,
                    point.y + Math.cos(time * 0.15) * 60,
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

            // Clear canvas completely
            ctx.clearRect(0, 0, width, height);

            time += 0.01;

            // Smooth mouse follow
            mouseX += (targetMouseX - mouseX) * 0.03;
            mouseY += (targetMouseY - mouseY) * 0.03;

            // Draw nebula background
            drawNebula();

            // Draw particles/dots
            drawParticles();

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
                background: '#000000'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
        />
    );
}
