'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Cpu, Shield, DollarSign, Layers, ArrowRight, Server, CheckCircle2, Cloud, Database, HardDrive, Lock } from 'lucide-react';
import { PORTFOLIO_DATA, ArchitectureDoc } from '@/data/portfolioData';

export default function ArchitectureLab() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeArch, setActiveArch] = useState<ArchitectureDoc>(PORTFOLIO_DATA.architectures[0]);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="section relative overflow-hidden bg-background"
    >
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
            Infrastructure Design & Thinking
          </span>
          <h2 className="section-title mb-6">
            Architecture <span className="gradient-text">Lab</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Interactive blueprints demonstrating architectural decision-making, security guardrails, operational reliability, and cost optimization.
          </p>
        </motion.div>

        {/* Architecture Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {PORTFOLIO_DATA.architectures.map((arch) => {
            const isActive = activeArch.id === arch.id;
            return (
              <button
                key={arch.id}
                onClick={() => setActiveArch(arch)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                  isActive
                    ? 'bg-accent-blue text-white border-accent-blue shadow-lg shadow-blue-500/20'
                    : 'glass text-foreground-muted border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {arch.title}
              </button>
            );
          })}
        </div>

        {/* Architecture Visualizer & Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArch.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Interactive Architecture Flow Diagram */}
            <div className="glass-card p-6 md:p-8 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-white">{activeArch.title}</h3>
                  <p className="text-xs text-foreground-muted mt-1">{activeArch.description}</p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 self-start md:self-auto">
                  Interactive Blueprint
                </span>
              </div>

              {/* Node Sequence Diagram */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-accent-blue uppercase tracking-wider mb-2">Architecture Pipeline Flow</div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 p-4 rounded-xl bg-black/40 border border-white/5">
                  {activeArch.diagram.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-3.5 py-2 rounded-lg bg-white/10 text-xs font-mono text-gray-200 border border-white/10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                        <span>{step}</span>
                      </div>
                      {idx < activeArch.diagram.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-accent-blue/60 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Pillars Breakdown Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1: Tech Choices */}
              <div className="glass-card p-6 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <Cpu className="w-4 h-4" /> Technology Choices
                </div>
                <ul className="space-y-2">
                  {activeArch.techChoices.map((choice, i) => (
                    <li key={i} className="text-xs text-gray-300 leading-relaxed">• {choice}</li>
                  ))}
                </ul>
              </div>

              {/* Pillar 2: Security */}
              <div className="glass-card p-6 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
                  <Shield className="w-4 h-4" /> Security Controls
                </div>
                <ul className="space-y-2">
                  {activeArch.security.map((sec, i) => (
                    <li key={i} className="text-xs text-gray-300 leading-relaxed">• {sec}</li>
                  ))}
                </ul>
              </div>

              {/* Pillar 3: Operational */}
              <div className="glass-card p-6 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                  <Layers className="w-4 h-4" /> Operational Reliability
                </div>
                <ul className="space-y-2">
                  {activeArch.operational.map((ops, i) => (
                    <li key={i} className="text-xs text-gray-300 leading-relaxed">• {ops}</li>
                  ))}
                </ul>
              </div>

              {/* Pillar 4: Cost */}
              <div className="glass-card p-6 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <DollarSign className="w-4 h-4" /> Cost Optimization
                </div>
                <ul className="space-y-2">
                  {activeArch.cost.map((c, i) => (
                    <li key={i} className="text-xs text-gray-300 leading-relaxed">• {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
