'use client';

import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight, Eye, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { Card3D } from '@/components/ui/Card3D';
import Link from 'next/link';
import { useState } from 'react';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

const categories = ['All', 'E-Commerce', 'SaaS', 'AI/ML', 'Agency', 'FinTech'];

// Filter to show only website projects (exclude mobile apps)
const websiteProjects = PROJECTS.filter(project =>
    !project.tags.some(tag =>
        tag.toLowerCase().includes('react native') ||
        tag.toLowerCase().includes('mobile') ||
        tag.toLowerCase().includes('ios') ||
        tag.toLowerCase().includes('android')
    )
);

const categoryColors: Record<string, string> = {
    'E-Commerce': 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/30',
    'SaaS': 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30',
    'AI/ML': 'text-[#22D3EE] bg-[#22D3EE]/10 border-[#22D3EE]/30',
    'Agency': 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30',
    'FinTech': 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30',
};

export function Projects() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

    const filteredProjects = activeCategory === 'All'
        ? websiteProjects
        : websiteProjects.filter(p => p.category === activeCategory);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const currentProjects = filteredProjects.slice(startIndex, endIndex);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    return (
        <section id="projects" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 sm:mb-12 lg:mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#0EA5E9]/10 to-[#06B6D4]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
                    >
                        ✨ Our Portfolio
                    </motion.span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                        Projects That
                        <br className="hidden sm:block" />
                        <span className="text-gradient"> Deliver Results</span>
                    </h2>
                    <p className="text-white/60 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
                        Explore our portfolio of successful projects—from e-commerce platforms to AI solutions that help businesses grow and succeed.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? 'bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/30'
                                    : 'bg-[#161E2E]/60 text-white/60 hover:bg-[#161E2E] hover:text-white border border-[#0EA5E9]/20'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    key={`${activeCategory}-${currentPage}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
                >
                    {currentProjects.map((project) => (
                        <motion.article
                            key={`${project.id}-${activeCategory}-${currentPage}`}
                            variants={itemVariants}
                        >
                            <Card3D className="h-full" intensity={10}>
                                <div className="h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#161E2E]/60 backdrop-blur-sm border border-[#0EA5E9]/20 hover:border-[#0EA5E9]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#0EA5E9]/20 card-3d">
                                {/* Image Container */}
                                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        className="object-cover transition-all duration-700 group-hover:scale-105"
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                    {/* Category badge */}
                                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${categoryColors[project.category] || 'text-white bg-white/10 border-white/20'}`}>
                                        {project.category}
                                    </div>

                                    {/* Quick actions */}
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="h-8 w-8 bg-[#161E2E]/80 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-[#0EA5E9] transition-colors border border-[#0EA5E9]/30"
                                        >
                                            <Eye size={14} />
                                        </motion.a>
                                    </div>

                                    {/* Stats overlay at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-around bg-gradient-to-t from-black/80 to-transparent">
                                        {Object.entries(project.stats).slice(0, 3).map(([key, value]) => (
                                            <div key={key} className="text-center">
                                                <p className="text-white font-bold text-sm sm:text-base">{value}</p>
                                                <p className="text-white/50 text-[10px] uppercase tracking-wider">{key}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5">
                                    {/* Title */}
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gradient transition-all duration-300 leading-snug">
                                            {project.title}
                                        </h3>
                                        <motion.div
                                            className="text-[#0EA5E9] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <TrendingUp size={18} />
                                        </motion.div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[#CBD5E1] text-sm leading-relaxed mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.slice(0, 4).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-[#0B0F14]/60 border border-[#0EA5E9]/20 rounded-md text-[10px] sm:text-xs font-medium text-[#CBD5E1]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            </Card3D>
                        </motion.article>
                    ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mt-12"
                    >
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg bg-[#161E2E]/60 border border-[#0EA5E9]/20 hover:border-[#0EA5E9]/50 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                        currentPage === page
                                            ? 'bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/30'
                                            : 'bg-[#161E2E]/60 border border-[#0EA5E9]/20 hover:border-[#0EA5E9]/50 text-white/60'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg bg-[#161E2E]/60 border border-[#0EA5E9]/20 hover:border-[#0EA5E9]/50 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </motion.div>
                )}

                {/* View More CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 sm:mt-16 text-center"
                >
                    <Link href="#contact">
                        <Button size="lg" className="group">
                            Start Your Project
                            <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
