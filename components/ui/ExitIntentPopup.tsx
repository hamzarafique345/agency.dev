'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
            }
        };

        // Show after 30 seconds if not shown yet
        const timeout = setTimeout(() => {
            if (!hasShown) {
                setIsVisible(true);
                setHasShown(true);
            }
        }, 30000);

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(timeout);
        };
    }, [hasShown]);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={() => setIsVisible(false)}
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-lg"
                    >
                        <div className="relative p-8 sm:p-10 bg-background/95 backdrop-blur-xl border border-primary/30 rounded-3xl shadow-2xl">
                            {/* Close button */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4 text-white/60" />
                            </button>

                            {/* Content */}
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-pink-500/20 border border-primary/30 mb-4">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-semibold text-white">Wait! Special Offer</span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                    Get 20% Off Your First Project
                                </h3>
                                <p className="text-white/70 mb-6">
                                    Book a free consultation in the next 24 hours and get 20% off your first project. Limited slots available!
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link href="#contact" onClick={() => setIsVisible(false)}>
                                        <Button size="lg" className="w-full sm:w-auto">
                                            Claim Your Discount
                                        </Button>
                                    </Link>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={() => setIsVisible(false)}
                                        className="w-full sm:w-auto"
                                    >
                                        Maybe Later
                                    </Button>
                                </div>

                                <p className="text-xs text-white/40 mt-4">
                                    Offer expires in 24 hours
                                </p>
                            </div>

                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)',
                                        backgroundSize: '200% 100%',
                                    }}
                                    animate={{
                                        backgroundPosition: ['200% 0', '-200% 0'],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
