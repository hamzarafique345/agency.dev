'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FAQ {
    question: string;
    answer: string;
}

interface LandingFAQProps {
    title: string;
    subtitle: string;
    faqs: FAQ[];
}

export function LandingFAQ({ title, subtitle, faqs }: LandingFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 sm:py-28 relative overflow-hidden">
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

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-lg font-semibold text-white pr-8">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                                        {openIndex === index ? (
                                            <Minus className="w-4 h-4 text-primary" />
                                        ) : (
                                            <Plus className="w-4 h-4 text-white/60" />
                                        )}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-white/60 mt-4 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-white/60 mb-4">Still have questions?</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        Contact us for more information
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
