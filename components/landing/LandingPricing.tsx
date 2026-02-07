'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
}

interface LandingPricingProps {
    title: string;
    subtitle: string;
    tiers: PricingTier[];
}

export function LandingPricing({ title, subtitle, tiers }: LandingPricingProps) {
    return (
        <section className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.02]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <div className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white text-xs font-bold">
                                        <Sparkles className="w-3 h-3" />
                                        MOST POPULAR
                                    </div>
                                </div>
                            )}

                            <div
                                className={`h-full p-8 rounded-2xl border transition-all duration-300 ${
                                    tier.popular
                                        ? 'bg-white/[0.05] border-primary/50 shadow-2xl shadow-primary/20 scale-105'
                                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                                }`}
                            >
                                {/* Tier Name */}
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {tier.name}
                                </h3>

                                {/* Description */}
                                <p className="text-white/60 text-sm mb-6">
                                    {tier.description}
                                </p>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-gradient">
                                            {tier.price}
                                        </span>
                                        {tier.price !== 'Custom' && (
                                            <span className="text-white/40 text-sm">one-time</span>
                                        )}
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-white/80 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link href="#contact">
                                    <Button
                                        className={`w-full group ${
                                            tier.popular
                                                ? 'bg-gradient-to-r from-primary to-pink-500'
                                                : ''
                                        }`}
                                        variant={tier.popular ? 'primary' : 'outline'}
                                    >
                                        {tier.cta}
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-white/40 text-sm mt-12"
                >
                    All prices are one-time payments. No hidden fees. 30-day money-back guarantee.
                </motion.p>
            </div>
        </section>
    );
}
