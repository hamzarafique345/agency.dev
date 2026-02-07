'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientOrbProps {
    className?: string;
    color?: 'primary' | 'blue' | 'pink' | 'cyan';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    animate?: boolean;
}

export function GradientOrb({
    className,
    color = 'primary',
    size = 'md',
    animate = true
}: GradientOrbProps) {
    const colors = {
        primary: 'bg-[#3B82F6]/20',
        blue: 'bg-[#3B82F6]/20',
        pink: 'bg-[#8B5CF6]/20',
        cyan: 'bg-[#22D3EE]/20',
    };

    const sizes = {
        sm: 'w-[200px] h-[200px]',
        md: 'w-[400px] h-[400px]',
        lg: 'w-[600px] h-[600px]',
        xl: 'w-[800px] h-[800px]',
    };

    return (
        <motion.div
            className={cn(
                'absolute rounded-full blur-[120px] -z-10',
                colors[color],
                sizes[size],
                className
            )}
            animate={animate ? {
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
            } : undefined}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}
