'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Card3D } from '@/components/ui/Card3D';

export function CallToAction() {
    return (
        <section className="py-20 sm:py-28 lg:py-36 relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-3xl border border-[#0EA5E9]/20 bg-[#161E2E]/60 backdrop-blur-sm shadow-xl shadow-[#0EA5E9]/10"
                >
                    <Card3D intensity={8}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                            Ready to Elevate Your Business?
                        </h2>
                        <p className="text-[#CBD5E1] text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            Let&apos;s build something extraordinary together. Reach out for a free consultation.
                        </p>
                        <Link href="https://wa.me/923451234567" target="_blank">
                            <Button size="lg" className="gap-3 group relative overflow-hidden bg-gradient-to-r from-[#22C55E] to-[#22C55E]/80 hover:from-[#22C55E]/90 hover:to-[#22C55E]/70 border-0 text-lg px-8 py-6 shadow-2xl shadow-[#22C55E]/30">
                                <MessageCircle size={24} />
                                <span className="font-semibold">Start WhatsApp Chat</span>
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                />
                            </Button>
                        </Link>
                    </Card3D>
                </motion.div>
            </div>
        </section>
    );
}
