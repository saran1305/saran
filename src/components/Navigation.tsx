'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Volume2, VolumeX, Terminal } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useSound } from '@/context/SoundContext';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Capability Map', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Case Studies', href: '#projects' },
  { label: 'DevSecOps', href: '#devsecops' },
  { label: 'Architecture Lab', href: '#architecture' },
  { label: 'Incidents', href: '#incidents' },
  { label: 'Journal', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const { isSoundEnabled, toggleSound } = useSound();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playClickSound = () => {
    if (isSoundEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.15;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        // ignore
      }
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl' : 'py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={() => playClickSound()}
            className="flex items-center gap-2 text-white font-mono font-bold text-sm tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-blue">
              <Terminal className="w-4 h-4" />
            </div>
            <span>SARAN.M <span className="text-accent-blue text-xs font-normal hidden sm:inline">| Senior Cloud Engineer</span></span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-xs font-medium text-foreground-muted hover:text-white transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">

            {/* Sound Toggle */}
            <button
              onClick={() => {
                toggleSound();
                playClickSound();
              }}
              className="p-2 rounded-lg glass border border-white/10 opacity-70 hover:opacity-100 transition-opacity text-white"
              aria-label="Toggle sound"
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                playClickSound();
              }}
              className="p-2 rounded-lg glass border border-white/10 opacity-70 hover:opacity-100 transition-opacity text-white"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                playClickSound();
              }}
              className="lg:hidden p-2 rounded-lg glass border border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-lg font-medium text-foreground-muted hover:text-white py-2 border-b border-white/5 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="text-center text-xs text-foreground-muted">
              Saran M • Senior Cloud & DevSecOps Engineer
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
