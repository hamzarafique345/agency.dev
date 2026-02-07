'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import Link from 'next/link';

interface LandingHeroProps {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta?: string;
    stats?: Array<{ value: string; label: string }>;
}

export function LandingHero({ badge, title, subtitle, cta, secondaryCta, stats }: LandingHeroProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background */}
            <GradientOrb color="primary" size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
            <GradientOrb color="blue" size="lg" className="top-0 right-0 translate-x-1/3 -translate-y-1/3 hidden lg:block opacity-30" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] -z-5" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-pink-500/20 border border-primary/30 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-white">{badge}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
                    >
                        <span className="text-white">{title.split(' ').slice(0, -3).join(' ')} </span>
                        <span className="text-gradient">{title.split(' ').slice(-3).join(' ')}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg sm:text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        <Link href="#contact">
                            <Button size="lg" className="group text-base sm:text-lg px-8">
                                {cta}
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        {secondaryCta && (
                            <Link href="#case-studies">
                                <Button size="lg" variant="outline" className="text-base sm:text-lg px-8">
                                    {secondaryCta}
                                </Button>
                            </Link>
                        )}
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-6 text-sm text-white/60"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span>Free Consultation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span>30-Day Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span>Money-Back Guarantee</span>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    {stats && stats.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="grid grid-cols-3 gap-6 sm:gap-8 mt-16 max-w-3xl mx-auto"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gradient mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs sm:text-sm text-white/50">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
