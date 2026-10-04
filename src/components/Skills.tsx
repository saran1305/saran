'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cloud, Cpu, GitBranch, Shield, Eye, Code, FileCheck, LucideIcon } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

const domainIcons: Record<string, LucideIcon> = {
  cloud: Cloud,
  infrastructure: Cpu,
  cicd: GitBranch,
  security: Shield,
  observability: Eye,
  application: Code,
  compliance: FileCheck,
};

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={sectionRef} className="section relative overflow-hidden bg-background">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
            Technical Competencies
          </span>
          <h2 className="section-title mb-6">
            Cloud & DevSecOps <span className="gradient-text">Capability Map</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Categorized by engineering domain, representing hands-on production expertise across multi-cloud infrastructure, automation, security, and application systems.
          </p>
        </motion.div>

        {/* Domain Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(PORTFOLIO_DATA.capabilityMap).map(([key, domain], idx) => {
            const IconComponent = domainIcons[key] || Cloud;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="glass-card p-6 border border-white/10 hover:border-accent-blue/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{domain.title}</h3>
                  </div>

                  <p className="text-xs text-foreground-muted mb-6 leading-relaxed">
                    {domain.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {domain.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-200 hover:border-accent-blue/50 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
