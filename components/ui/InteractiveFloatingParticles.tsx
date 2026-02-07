'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    randomX: number;
}

function generateParticles(count: number): Particle[] {
    const generated: Particle[] = [];
    for (let i = 0; i < count; i++) {
        generated.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
            randomX: Math.random() * 20 - 10,
        });
    }
    return generated;
}

export function InteractiveFloatingParticles({ count = 50 }: { count?: number }) {
    const [particles] = useState<Particle[]>(() => generateParticles(count));
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {particles.map((particle) => (
                <Particle key={particle.id} particle={particle} mouseX={mouseX} mouseY={mouseY} />
            ))}
        </div>
    );
}

function Particle({ particle, mouseX, mouseY }: { particle: Particle, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) {
    const x = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 0], [-particle.size * 5, particle.size * 5]);
    const y = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 0], [-particle.size * 5, particle.size * 5]);

    return (
        <motion.div
            className="absolute rounded-full bg-primary/30"
            style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                x: x,
                y: y,
            }}
            animate={{
                y: [y.get(), y.get() - 30, y.get()],
                x: [x.get(), x.get() + particle.randomX, x.get()],
                opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />
    );
}
