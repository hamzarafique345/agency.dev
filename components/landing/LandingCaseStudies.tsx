'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Card3D } from '@/components/ui/Card3D';

interface CaseStudy {
    id: number;
    title: string;
    description: string;
    image: string;
    results: string[];
    tags: string[];
}

interface LandingCaseStudiesProps {
    title: string;
    subtitle: string;
    caseStudies: CaseStudy[];
}

export function LandingCaseStudies({ title, subtitle, caseStudies }: LandingCaseStudiesProps) {
    return (
        <section id="case-studies" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
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

                {/* Case Studies Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card3D intensity={8}>
                                <div className="h-full rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-primary/30 transition-all duration-500">
                                    {/* Image */}
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={study.image}
                                            alt={study.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-8">
                                        <h3 className="text-2xl font-bold text-white mb-3">
                                            {study.title}
                                        </h3>
                                        <p className="text-white/60 mb-6">
                                            {study.description}
                                        </p>

                                        {/* Results */}
                                        <div className="space-y-3 mb-6">
                                            {study.results.map((result, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                    <span className="text-white/80">{result}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {study.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <button className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium">
                                            View Full Case Study
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </Card3D>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
