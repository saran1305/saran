'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import DevOpsPlayground from "@/components/DevOpsPlayground";
import Contact from "@/components/Contact";
import Loader from "@/components/LoaderTerminal";
import ChatWidget from "@/components/ChatWidget";


// Lazy load Hero component with 3D to improve initial load
const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999]"
          >
            <Loader onComplete={() => {
              window.scrollTo(0, 0); // Force scroll to top
              setIsLoading(false);
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <DevOpsPlayground />
      <Contact />
      <ChatWidget />
    </main>
  );
}
