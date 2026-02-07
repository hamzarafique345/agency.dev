'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Linkedin, MessageCircle, Mail, Phone, Heart, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data';

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
        },
    },
};

export function Footer() {
    const currentYear = new Date().getFullYear();

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    };

    return (
        <footer className="relative border-t border-[#3B82F6]/10 bg-gradient-to-b from-[#0B0F14] to-[#000000]">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                >
                    {/* Brand Column */}
                    <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold tracking-tighter">
                                <span className="text-gradient">AGENCY</span>
                                <span className="text-white">.dev</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Crafting digital experiences that merge innovation with aesthetics.
                            We build the future of the web, one pixel at a time.
                        </p>

                        {/* Social Links with pulse animation */}
                        <div className="flex gap-3 mt-6">
                            <motion.a
                                href="https://www.linkedin.com/in/your-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-10 w-10 rounded-xl bg-white/5 border border-[#3B82F6]/30 flex items-center justify-center hover:bg-[#3B82F6]/20 hover:border-[#3B82F6]/60 transition-all text-muted-foreground hover:text-white pulse-neon-blue"
                            >
                                <Linkedin size={18} />
                            </motion.a>
                            <motion.a
                                href="https://wa.me/923451234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-10 w-10 rounded-xl bg-white/5 border border-[#22C55E]/30 flex items-center justify-center hover:bg-[#22C55E]/20 hover:border-[#22C55E]/60 transition-all text-muted-foreground hover:text-white"
                                style={{
                                    boxShadow: '0 0 20px -5px rgba(34, 197, 94, 0.4)',
                                    animation: 'pulse-glow 2s ease-in-out infinite'
                                }}
                            >
                                <MessageCircle size={18} />
                            </motion.a>
                            <motion.a
                                href="https://wa.me/923161234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-10 w-10 rounded-xl bg-white/5 border border-[#22D3EE]/30 flex items-center justify-center hover:bg-[#22D3EE]/20 hover:border-[#22D3EE]/60 transition-all text-muted-foreground hover:text-white pulse-neon-cyan"
                            >
                                <MessageCircle size={18} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={(e) => handleSmoothScroll(e, link.href)}
                                        className="text-sm text-muted-foreground hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                            Services
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {['Web Development', 'E-Commerce', 'AI Chatbots', 'Real Estate', 'Trading Platforms'].map((service) => (
                                <li key={service}>
                                    <Link
                                        href="/#services"
                                        className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {service}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                            Get in Touch
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <a href="mailto:hello@agency.dev" className="hover:text-primary transition-colors flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    hello@agency.dev
                                </a>
                            </li>
                            <li>
                                <a href="tel:+923451234567" className="hover:text-primary transition-colors flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    +92 345 1234567
                                </a>
                            </li>
                            <li>
                                <a href="tel:+923161234567" className="hover:text-primary transition-colors flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    +92 316 1234567
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/923451234567" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp
                                </a>
                            </li>
                        </ul>

                        {/* Status indicator with green pulse */}
                        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
                            </span>
                            <span className="text-xs text-[#22C55E] font-medium">Available for projects</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 flex-wrap justify-center">
                        © {currentYear} AGENCY.dev. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                        <Link href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
