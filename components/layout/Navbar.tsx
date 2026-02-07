'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const resetMenuState = () => {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    useEffect(() => {
        resetMenuState();
    }, [pathname]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

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
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                isScrolled
                    ? 'py-3 bg-[#0B0F14]/90 backdrop-blur-xl border-b border-[#3B82F6]/10 shadow-lg shadow-black/10'
                    : 'py-5 bg-transparent'
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative group">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-xl sm:text-2xl font-bold tracking-tighter"
                        >
                            <span className="text-gradient font-extrabold">AGENCY</span>
                            <span className="text-white">.dev</span>
                        </motion.div>
                        <div className="absolute -inset-2 bg-[#3B82F6]/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link: any, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                                onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {link.dropdown ? (
                                    <>
                                        <button
                                            className={cn(
                                                'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group flex items-center gap-1',
                                                'text-muted-foreground hover:text-white'
                                            )}
                                        >
                                            {link.name}
                                            <ChevronDown className={cn(
                                                "w-4 h-4 transition-transform",
                                                openDropdown === link.name && "rotate-180"
                                            )} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {openDropdown === link.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 mt-2 w-72 bg-[#161E2E]/95 backdrop-blur-xl border border-[#3B82F6]/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                                                >
                                                    <div className="p-2">
                                                        {link.dropdown.map((item: any, idx: number) => (
                                                            <Link
                                                                key={item.name}
                                                                href={item.href}
                                                                className="block p-3 rounded-xl hover:bg-[#3B82F6]/10 transition-all group/item"
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <div className="flex-1">
                                                                        <div className="text-white font-medium text-sm mb-1 group-hover/item:text-[#3B82F6] transition-colors">
                                                                            {item.name}
                                                                        </div>
                                                                        <div className="text-[#CBD5E1]/60 text-xs leading-relaxed">
                                                                            {item.description}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={(e) => handleSmoothScroll(e, link.href)}
                                        className={cn(
                                            'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group',
                                            pathname === link.href
                                                ? 'text-white'
                                                : 'text-muted-foreground hover:text-white'
                                        )}
                                    >
                                        {link.name}
                                        {pathname === link.href && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] group-hover:w-1/2 transition-all duration-300" />
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link href="https://wa.me/923451234567" target="_blank">
                            <Button size="sm" className="group gap-2 bg-[#25D366] hover:bg-[#20BA5A] border-0 shadow-lg shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all">
                                <MessageCircle size={16} />
                                Let's Talk on WhatsApp
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="lg:hidden relative h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={20} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-[#0B0F14]/95 backdrop-blur-xl border-l border-white/10 lg:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col h-full p-6">
                                <div className="flex justify-end mb-8">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                                    >
                                        <X size={20} />
                                    </motion.button>
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    {NAV_LINKS.map((link: any, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {link.dropdown ? (
                                                <div>
                                                    <button
                                                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                                        className="w-full flex items-center justify-between py-3 px-4 text-lg font-medium rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
                                                    >
                                                        {link.name}
                                                        <ChevronDown className={cn(
                                                            "w-5 h-5 transition-transform",
                                                            openDropdown === link.name && "rotate-180"
                                                        )} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {openDropdown === link.name && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="pl-4 pt-2 space-y-1">
                                                                    {link.dropdown.map((item: any) => (
                                                                        <Link
                                                                            key={item.name}
                                                                            href={item.href}
                                                                            className="block py-2 px-3 text-sm text-[#CBD5E1]/80 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    onClick={(e) => handleSmoothScroll(e, link.href)}
                                                    className={cn(
                                                        'block py-3 px-4 text-lg font-medium rounded-xl transition-all',
                                                        pathname === link.href
                                                            ? 'bg-[#3B82F6]/20 text-white border border-[#3B82F6]/30'
                                                            : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                                    )}
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-6"
                                >
                                    <Link href="https://wa.me/923451234567" target="_blank">
                                        <Button className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A] border-0 shadow-lg shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all" size="lg">
                                            <MessageCircle size={20} />
                                            Let's Talk on WhatsApp
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
