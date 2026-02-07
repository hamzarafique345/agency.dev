'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, User, Mail, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from './Button';

interface FormData {
    name: string;
    email: string;
    service: string;
    message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        service: '',
        message: '',
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const services = [
        'E-Commerce Development',
        'AI Chatbot Integration',
        'Agency Website',
        'Real Estate Platform',
        'SaaS Development',
        'Business Automation',
        'Other',
    ];

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.service) newErrors.service = 'Please select a service';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setStatus('loading');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // TODO: Replace with actual API call
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        // });

        setStatus('success');
        setFormData({ name: '', email: '', service: '', message: '' });

        setTimeout(() => setStatus('idle'), 5000);
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Name Field */}
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-white/80">
                    Full Name *
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border ${
                            errors.name ? 'border-red-500/50' : 'border-white/10'
                        } rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all`}
                        placeholder="John Doe"
                        disabled={status === 'loading'}
                    />
                </div>
                <AnimatePresence>
                    {errors.name && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-xs flex items-center gap-1"
                        >
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white/80">
                    Email Address *
                </label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border ${
                            errors.email ? 'border-red-500/50' : 'border-white/10'
                        } rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all`}
                        placeholder="john@example.com"
                        disabled={status === 'loading'}
                    />
                </div>
                <AnimatePresence>
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-xs flex items-center gap-1"
                        >
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
                <label htmlFor="service" className="block text-sm font-medium text-white/80">
                    Service Interested In *
                </label>
                <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => handleChange('service', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border ${
                            errors.service ? 'border-red-500/50' : 'border-white/10'
                        } rounded-xl text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all appearance-none cursor-pointer`}
                        disabled={status === 'loading'}
                    >
                        <option value="" className="bg-background">Select a service</option>
                        {services.map((service) => (
                            <option key={service} value={service} className="bg-background">
                                {service}
                            </option>
                        ))}
                    </select>
                </div>
                <AnimatePresence>
                    {errors.service && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-xs flex items-center gap-1"
                        >
                            <AlertCircle className="w-3 h-3" />
                            {errors.service}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-white/80">
                    Project Details *
                </label>
                <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={5}
                        className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border ${
                            errors.message ? 'border-red-500/50' : 'border-white/10'
                        } rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none`}
                        placeholder="Tell us about your project..."
                        disabled={status === 'loading'}
                    />
                </div>
                <AnimatePresence>
                    {errors.message && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-xs flex items-center gap-1"
                        >
                            <AlertCircle className="w-3 h-3" />
                            {errors.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                size="lg"
                className="w-full relative overflow-hidden group"
                disabled={status === 'loading' || status === 'success'}
            >
                <AnimatePresence mode="wait">
                    {status === 'loading' && (
                        <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </motion.span>
                    )}
                    {status === 'success' && (
                        <motion.span
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Message Sent!
                        </motion.span>
                    )}
                    {(status === 'idle' || status === 'error') && (
                        <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            Send Message
                            <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </Button>

            {/* Success Message */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                    >
                        <p className="text-green-400 text-sm text-center">
                            Thank you! We'll get back to you within 24 hours.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.form>
    );
}
