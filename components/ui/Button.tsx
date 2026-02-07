'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

        const variants = {
            primary: 'bg-[#0EA5E9] text-white shadow-[0_0_25px_-5px_rgba(14,165,233,0.6)] hover:shadow-[0_0_40px_-5px_rgba(14,165,233,0.9)] hover:brightness-110 transition-all duration-300',
            secondary: 'bg-[#0EA5E9]/90 text-white hover:bg-[#0EA5E9] shadow-[0_0_15px_-5px_rgba(14,165,233,0.4)] hover:shadow-[0_0_25px_-5px_rgba(14,165,233,0.6)]',
            outline: 'border-2 border-[#0EA5E9] bg-transparent hover:bg-[#0EA5E9] text-[#0EA5E9] hover:text-white backdrop-blur-sm transition-all duration-300',
            ghost: 'bg-transparent hover:bg-[#0EA5E9]/20 text-[#0EA5E9] hover:text-white transition-all duration-300',
        };

        const sizes = {
            sm: 'h-9 px-3 text-xs',
            md: 'h-11 px-8 text-sm',
            lg: 'h-14 px-10 text-base',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    'relative inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                {children}
            </motion.button>
        );
    }
);
Button.displayName = 'Button';

export { Button };
