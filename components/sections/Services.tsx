'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/data';
import { Card3D } from '@/components/ui/Card3D';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    primary: {
        bg: 'from-[#0EA5E9]/20 to-[#06B6D4]/20',
        border: 'group-hover:border-[#0EA5E9]/60',
        text: 'text-[#0EA5E9]',
        glow: 'group-hover:shadow-[#0EA5E9]/30',
    },
    green: {
        bg: 'from-[#22C55E]/20 to-[#22C55E]/20',
        border: 'group-hover:border-[#22C55E]/60',
        text: 'text-[#22C55E]',
        glow: 'group-hover:shadow-[#22C55E]/30',
    },
    blue: {
        bg: 'from-[#0EA5E9]/20 to-[#06B6D4]/20',
        border: 'group-hover:border-[#0EA5E9]/60',
        text: 'text-[#0EA5E9]',
        glow: 'group-hover:shadow-[#0EA5E9]/30',
    },
    pink: {
        bg: 'from-[#0EA5E9]/20 to-[#06B6D4]/20',
        border: 'group-hover:border-[#0EA5E9]/60',
        text: 'text-[#0EA5E9]',
        glow: 'group-hover:shadow-[#0EA5E9]/30',
    },
    yellow: {
        bg: 'from-[#0EA5E9]/20 to-[#06B6D4]/20',
        border: 'group-hover:border-[#0EA5E9]/60',
        text: 'text-[#0EA5E9]',
        glow: 'group-hover:shadow-[#0EA5E9]/30',
    },
    purple: {
        bg: 'from-[#0EA5E9]/20 to-[#06B6D4]/20',
        border: 'group-hover:border-[#0EA5E9]/60',
        text: 'text-[#0EA5E9]',
        glow: 'group-hover:shadow-[#0EA5E9]/30',
    },
};

export function Services() {
    return (
        <section id="services" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-16 lg:mb-20"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#0EA5E9]/10 to-[#06B6D4]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
                    >
                        🚀 Our Expertise
                    </motion.span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                        Services That
                        <br className="hidden sm:block" />
                        <span className="text-gradient"> Power Your Growth</span>
                    </h2>
                    <p className="text-[#CBD5E1] text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
                        From modern web development to AI automation—we provide the technology solutions
                        your business needs to succeed in today&apos;s digital world.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                    {SERVICES.map((service) => {
                        const colors = colorMap[service.color] || colorMap.primary;

                        return (
                            <motion.article
                                key={service.title}
                                variants={itemVariants}
                                className="group"
                            >
                                <Card3D className="h-full" intensity={10}>
                                <div className={`h-full p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-[#161E2E]/60 backdrop-blur-sm border border-[#0EA5E9]/20 ${colors.border} transition-all duration-500 hover:bg-[#161E2E]/80 hover:shadow-2xl ${colors.glow} hover:scale-105 card-3d`}>
                                    {/* Icon */}
                                    <motion.div
                                        className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4 sm:mb-5 ${colors.text} relative overflow-hidden`}
                                        whileHover={{ scale: 1.05, rotate: 3 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <service.icon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-gradient transition-all duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-4">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {service.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-xs font-medium ${colors.text} border border-white/5`}
                                            >
                                                <Check className="w-3 h-3" />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Learn more link */}
                                    <Link
                                        href="#contact"
                                        className={`inline-flex items-center gap-2 ${colors.text} text-sm font-medium opacity-60 group-hover:opacity-100 transition-all`}
                                    >
                                        <span>Get Started</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                                </Card3D>
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-12 sm:mt-16 text-center"
                >
                    <p className="text-white/40 text-sm mb-4">
                        Can&apos;t find what you need?
                    </p>
                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary/10 hover:border-primary/30 transition-all text-sm font-medium group"
                    >
                        Let&apos;s discuss your custom project
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
