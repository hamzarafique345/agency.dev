'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const clientImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
];

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: 0.4,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function TrustIndicators() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-8 sm:mt-10"
        >
            <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="flex -space-x-3">
                    {clientImages.map((image, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 1 + i * 0.1,
                                duration: 0.4,
                                ease: "easeOut"
                            }}
                            whileHover={{
                                scale: 1.15,
                                zIndex: 10,
                                transition: { duration: 0.3 }
                            }}
                            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-[#0EA5E9] shadow-lg shadow-[#0EA5E9]/50 cursor-pointer overflow-hidden"
                        >
                            <Image
                                src={image}
                                alt={`Client ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="48px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0EA5E9]/20 to-transparent" />
                        </motion.div>
                    ))}
                </div>
                <span className="text-[#CBD5E1] text-xs sm:text-sm font-medium">15+ Happy Clients</span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2">
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.3 + i * 0.08 }}
                            className="text-[#22C55E] text-sm"
                        >
                            ★
                        </motion.span>
                    ))}
                </div>
                <span className="text-[#CBD5E1] text-xs sm:text-sm">4.58/5 Rating</span>
            </motion.div>
        </motion.div>
    );
}
