'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import DevSecOps from '@/components/DevSecOps';
import ArchitectureLab from '@/components/ArchitectureLab';
import ProductionLessons from '@/components/ProductionLessons';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import ChatWidget from '@/components/ChatWidget';
import Loader from '@/components/LoaderTerminal';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-accent-blue selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999]"
          >
            <Loader
              onComplete={() => {
                window.scrollTo(0, 0);
                setIsLoading(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <DevSecOps />
      <ArchitectureLab />
      <ProductionLessons />
      <Blog />
      <Contact />
      <ChatWidget />
    </main>
  );
}
