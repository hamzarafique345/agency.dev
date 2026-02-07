'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TrustIndicators } from '@/components/sections/TrustIndicators';
import { InteractiveFloatingParticles } from '@/components/ui/InteractiveFloatingParticles';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { useRef } from 'react';
import Link from 'next/link';

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            const offsetTop = projectsSection.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
        >
            {/* Background */}
            <InteractiveFloatingParticles count={25} />
            <GradientOrb color="primary" size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" />
            <GradientOrb color="blue" size="lg" className="top-0 right-0 translate-x-1/3 -translate-y-1/3 hidden lg:block" />
            <GradientOrb color="pink" size="md" className="bottom-0 left-0 -translate-x-1/3 translate-y-1/3 hidden lg:block" />

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] -z-5" />

            <motion.div
                style={{ y, opacity }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-16 sm:pt-20"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center gap-5 sm:gap-6"
                >

                   

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl"
                    >
                        <span className="text-white">We Build </span>
                        <motion.span
                            className="text-gradient"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            Websites
                        </motion.span>
                        <span className="text-white"> That</span>
                        <br className="hidden sm:block" />
                        <span className="text-white">Scale Your </span>
                        <span className="relative inline-block text-gradient-blue">
                            Business
                            <motion.svg
                                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-blue-400"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.5 }}
                                transition={{ delay: 0.8, duration: 1 }}
                            >
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.8, duration: 1 }}
                                />
                            </motion.svg>
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-xs sm:max-w-xl md:max-w-2xl text-sm sm:text-base md:text-lg text-[#CBD5E1] leading-relaxed"
                    >
                        E-commerce platforms, AI chatbots, automation systems, and stunning websites.
                        <span className="text-white hidden sm:inline"> We transform startups into market leaders with cutting-edge technology.</span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto"
                    >
                        <Button
                            size="lg"
                            className="text-sm sm:text-base w-full sm:w-auto"
                            onClick={scrollToProjects}
                        >
                            View Our Work
                        </Button>
                        <Link href="#contact" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="text-sm sm:text-base group w-full">
                                Get Free Quote
                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </Button>
                        </Link>
                    </motion.div>

                    <TrustIndicators />

                    {/* Tech Stack Ticker */}
                  
                </motion.div>
            </motion.div>

                </section>
    );
}
