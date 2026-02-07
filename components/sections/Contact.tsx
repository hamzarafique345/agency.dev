'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Card3D } from '@/components/ui/Card3D';
import Link from 'next/link';

export function Contact() {
    return (
        <section id="contact" className="py-20 sm:py-28 lg:py-36 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#0EA5E9]/20 to-[#06B6D4]/20 border border-[#0EA5E9]/40 mb-8"
                    >
                        <motion.span
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles size={16} className="text-[#0EA5E9]" />
                        </motion.span>
                        <span className="text-sm font-semibold text-white">Let&apos;s Work Together</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-white">Let&apos;s Build Something</span>
                        <br />
                        <span className="text-gradient">Amazing Together</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="text-[#CBD5E1] text-lg sm:text-xl mb-12 leading-relaxed max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Ready to take your business to the next level? Contact us on WhatsApp for a free consultation and let&apos;s discuss your project.
                    </motion.p>

                    {/* WhatsApp Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mb-10"
                    >
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
                    </motion.div>

                    {/* Contact Info Cards */}
                    <motion.div
                        className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                                                {/* Phone Numbers */}
                                                <Card3D intensity={10}>
                                                    <div className="p-6 rounded-2xl bg-[#161E2E]/60 border border-[#0EA5E9]/20 backdrop-blur-sm hover:bg-[#161E2E]/80 hover:border-[#0EA5E9]/40 transition-all text-left">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="bg-gradient-to-br from-[#0EA5E9]/20 to-[#06B6D4]/20 p-3 rounded-full">
                                                                <MessageCircle size={20} className="text-[#0EA5E9]" />
                                                            </div>
                                                            <p className="text-[#CBD5E1] text-lg font-semibold">Call Us</p>
                                                        </div>
                                                        <div className="space-y-3 pl-2">
                                                            <a href="tel:+923451234567" className="block text-white hover:text-[#0EA5E9] transition-colors group">
                                                                <span className="font-medium">Telenor:</span> +92 345 1234567
                                                                <ArrowRight className="inline-block ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </a>
                                                            <a href="tel:+923161234567" className="block text-white hover:text-[#0EA5E9] transition-colors group">
                                                                <span className="font-medium">Zong:</span> +92 316 1234567
                                                                <ArrowRight className="inline-block ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </Card3D>
                        
                                                {/* LinkedIn */}
                                                <Card3D intensity={10}>
                                                    <div className="p-6 rounded-2xl bg-[#161E2E]/60 border border-[#0EA5E9]/20 backdrop-blur-sm hover:bg-[#161E2E]/80 hover:border-[#0EA5E9]/40 transition-all text-left">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="bg-gradient-to-br from-[#0EA5E9]/20 to-[#06B6D4]/20 p-3 rounded-full">
                                                                <MessageCircle size={20} className="text-[#0EA5E9]" />
                                                            </div>
                                                            <p className="text-[#CBD5E1] text-lg font-semibold">Connect</p>
                                                        </div>
                                                        <Link href="https://www.linkedin.com/in/your-profile" target="_blank" className="inline-flex items-center text-white hover:text-[#0EA5E9] transition-colors font-medium group pl-2">
                                                            LinkedIn Profile
                                                            <ArrowRight className="inline-block ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </Link>
                                                    </div>
                                                </Card3D>                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
