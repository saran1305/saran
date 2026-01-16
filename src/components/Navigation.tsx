'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'DevOps', href: '#devops' },
    { label: 'Contact', href: '#contact' },
];

import { useSound } from '@/context/SoundContext';

export default function Navigation() {
    const { theme, toggleTheme } = useTheme();
    const { isSoundEnabled, toggleSound } = useSound();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const playClickSound = () => {
        if (isSoundEnabled) {
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.2; // Increased from 0.1

            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    };

    const handleNavClick = (href: string) => {
        playClickSound();
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background shadow-md py-4' : 'py-6'}`}
            >
                <div className="container-custom flex items-center justify-between">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleNavClick(item.href)}
                                className="relative text-sm text-foreground-muted hover:text-foreground transition-colors duration-300 magnetic-button"
                                data-magnetic="true"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 hover:w-full" />
                            </motion.button>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        {/* Sound Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                toggleSound();
                                // Optional logic: play sound to confirm enabling? 
                                // Current logic plays sound regardless in onClick if soundEnabled is true, 
                                // but we might want to check the *next* state or just allow the toggle itself to be silent?
                                // Let's keep it simple: if enabling, play sound. 
                                if (!isSoundEnabled) {
                                    // Use a small timeout to play AFTER state update if needed, or just play directly
                                    // Actually, duplicate playClickSound logic because state update is async
                                    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
                                    const oscillator = audioContext.createOscillator();
                                    const gainNode = audioContext.createGain();
                                    oscillator.connect(gainNode);
                                    gainNode.connect(audioContext.destination);
                                    oscillator.frequency.value = 800;
                                    oscillator.type = 'sine';
                                    gainNode.gain.value = 0.1;
                                    oscillator.start();
                                    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
                                    oscillator.stop(audioContext.currentTime + 0.1);
                                }
                            }}
                            className="p-2 rounded-full glass-card opacity-60 hover:opacity-100 transition-opacity"
                            aria-label="Toggle sound"
                        >
                            {isSoundEnabled ? (
                                <Volume2 className="w-4 h-4" />
                            ) : (
                                <VolumeX className="w-4 h-4" />
                            )}
                        </motion.button>

                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                toggleTheme();
                                playClickSound();
                            }}
                            className="p-2 rounded-full glass-card opacity-60 hover:opacity-100 transition-opacity"
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait">
                                {theme === 'dark' ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Sun className="w-4 h-4" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Moon className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                                playClickSound();
                            }}
                            className="md:hidden p-2 rounded-full glass-card"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.nav >

            {/* Mobile Menu */}
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
                        >
                            <div className="flex flex-col items-center justify-center h-full gap-8">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleNavClick(item.href)}
                                        className="text-2xl font-medium text-foreground-muted hover:text-foreground transition-colors"
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
}
