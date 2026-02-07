'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Clock, Users, Star, Zap } from 'lucide-react';
import { Card3D } from '@/components/ui/Card3D';

const badges = [
    {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Award,
        title: 'Award Winning',
        description: 'Top rated agency 2024',
        color: 'from-yellow-500 to-orange-500',
    },
    {
        icon: Clock,
        title: '24/7 Support',
        description: 'Always here to help',
        color: 'from-green-500 to-emerald-500',
    },
    {
        icon: Users,
        title: '50+ Clients',
        description: 'Trusted worldwide',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: Star,
        title: '5.0 Rating',
        description: '98% satisfaction rate',
        color: 'from-pink-500 to-rose-500',
    },
    {
        icon: Zap,
        title: 'Fast Delivery',
        description: 'On-time, every time',
        color: 'from-violet-500 to-purple-500',
    },
];

export function TrustBadges() {
    return (
        <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Why Choose Us?
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base">
                        Trusted by businesses worldwide for exceptional results
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={badge.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="group"
                        >
                            <Card3D intensity={8}>
                                <div className="p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 text-center h-full flex flex-col items-center justify-center">
                                    {/* Icon with gradient background */}
                                    <div className={`relative mb-3 sm:mb-4`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-20 blur-xl rounded-full`} />
                                        <div className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                                            <badge.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                                        {badge.title}
                                    </h4>
                                    <p className="text-xs text-white/50">
                                        {badge.description}
                                    </p>

                                    {/* Hover glow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                                </div>
                            </Card3D>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
