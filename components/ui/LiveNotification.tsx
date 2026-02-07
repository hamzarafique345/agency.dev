'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import Image from 'next/image';

interface Notification {
    id: number;
    name: string;
    action: string;
    time: string;
    avatar: string;
}

const notifications: Notification[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        action: 'just booked a consultation',
        time: '2 minutes ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Michael Chen',
        action: 'started an e-commerce project',
        time: '5 minutes ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Emma Williams',
        action: 'requested a quote',
        time: '8 minutes ago',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop',
    },
    {
        id: 4,
        name: 'David Martinez',
        action: 'signed up for AI chatbot',
        time: '12 minutes ago',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop',
    },
];

export function LiveNotification() {
    const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let index = 0;

        const showNotification = () => {
            setCurrentNotification(notifications[index]);
            setIsVisible(true);

            setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            index = (index + 1) % notifications.length;
        };

        // Show first notification after 3 seconds
        const initialTimeout = setTimeout(showNotification, 3000);

        // Then show every 15 seconds
        const interval = setInterval(showNotification, 15000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && currentNotification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-6 left-6 z-50 max-w-sm"
                >
                    <div className="relative p-4 bg-background/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <X className="w-3 h-3 text-white/60" />
                        </button>

                        <div className="flex items-start gap-3">
                            {/* Avatar */}
                            <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/30">
                                <Image
                                    src={currentNotification.avatar}
                                    alt={currentNotification.name}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    <p className="text-sm font-semibold text-white">
                                        {currentNotification.name}
                                    </p>
                                </div>
                                <p className="text-sm text-white/70">
                                    {currentNotification.action}
                                </p>
                                <p className="text-xs text-white/40 mt-1">
                                    {currentNotification.time}
                                </p>
                            </div>
                        </div>

                        {/* Animated border */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)',
                                backgroundSize: '200% 100%',
                            }}
                            animate={{
                                backgroundPosition: ['200% 0', '-200% 0'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
