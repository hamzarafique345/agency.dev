'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function FloatingCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="fixed bottom-6 right-6 z-40 hidden lg:block"
        >
            <Link href="https://wa.me/923451234567" target="_blank">
                <Button
                    size="lg"
                    className="group shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-0"
                >
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp Chat
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </motion.div>
    );
}
