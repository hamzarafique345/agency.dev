'use client';

import { motion } from 'framer-motion';
import { STATS, TECH_STACK } from '@/lib/data';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Card3D } from '@/components/ui/Card3D';

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

export function Stats() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16"
                >
                    {STATS.map((stat) => (
                        <Card3D key={stat.label} intensity={10}>
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center p-4 sm:p-6 rounded-2xl bg-[#161E2E]/60 border border-[#3B82F6]/20 hover:border-[#3B82F6]/50 transition-all group hover:shadow-xl hover:shadow-[#3B82F6]/30"
                            >
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gradient mb-2">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} label={stat.label} />
                                </div>
                                <p className="text-[#CBD5E1]/70 text-xs sm:text-sm font-medium">{stat.label}</p>
                            </motion.div>
                        </Card3D>
                    ))}
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-[#CBD5E1]/50 text-xs uppercase tracking-wider mb-6">Technologies We Master</p>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {TECH_STACK.map((tech, i) => (
                            <Card3D key={tech.name} intensity={8}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#161E2E]/60 border border-[#3B82F6]/20 hover:border-[#3B82F6]/50 transition-all"
                                >
                                    <tech.icon className="w-4 h-4 text-[#3B82F6]" />
                                    <span className="text-[#CBD5E1] text-sm font-medium">{tech.name}</span>
                                </motion.div>
                            </Card3D>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
