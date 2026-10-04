'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Server, Cloud, Database, Activity, ArrowRight, X, Shield, Lock, FileCheck, Cpu, Layers, DollarSign, CheckCircle2, LucideIcon } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectCaseStudy } from '@/data/portfolioData';

const iconMap: Record<string, LucideIcon> = {
  glido: Server,
  srd: Cloud,
  'assure-bharath': Database,
  ackumen: Activity,
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'all' | 'cloud-devops' | 'development'>('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectCaseStudy | null>(null);

  const filteredProjects = PORTFOLIO_DATA.caseStudies.filter((p) => {
    if (activeTab === 'all') return true;
    return p.domain === activeTab;
  });

  return (
    <section id="projects" ref={sectionRef} className="section relative overflow-hidden bg-background">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
            Technical Credibility & Case Studies
          </span>
          <h2 className="section-title mb-6">
            Featured Production <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Deep technical breakdowns of real-world cloud infrastructure, continuous deployment pipelines, security controls, and application systems.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex p-1 rounded-2xl glass border border-white/10 mx-auto mt-8">
            {(['all', 'cloud-devops', 'development'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  activeTab === tab ? 'text-white' : 'text-foreground-muted hover:text-white'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeProjTab"
                    className="absolute inset-0 bg-accent-blue/20 rounded-xl border border-accent-blue/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'all' ? 'All Engineering Projects' : tab === 'cloud-devops' ? 'Cloud & DevSecOps' : 'Supporting Application Stack'}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Case Study Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            const IconComp = iconMap[project.id] || Server;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`glass-card p-6 md:p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                  project.flagship
                    ? 'border-accent-blue/50 shadow-xl shadow-blue-500/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {project.flagship && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-500/20 text-accent-blue border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider">
                    Flagship Cloud Architecture
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center glass border border-white/10"
                      style={{ color: project.color }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <p className="text-xs text-foreground-muted">{project.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Architecture Diagram Preview Flow */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6 space-y-2">
                    <div className="text-[10px] font-mono font-bold text-accent-blue uppercase tracking-wider">
                      Architecture Pipeline Flow
                    </div>
                    <div className="text-xs font-mono text-gray-300 leading-relaxed">
                      {project.architectureFlow.description}
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[11px] text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveCaseStudy(project)}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-accent-blue hover:text-white border border-white/10 text-xs font-semibold text-gray-200 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCaseStudy(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0d12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                <div>
                  <span className="text-[10px] font-mono font-bold text-accent-blue uppercase tracking-wider">
                    Detailed Case Study Breakdown
                  </span>
                  <h3 className="text-xl font-bold text-white">{activeCaseStudy.title} — {activeCaseStudy.subtitle}</h3>
                </div>
                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="p-2 rounded-lg text-foreground-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 text-foreground-muted text-sm leading-relaxed">
                {/* Visual Architecture Flow */}
                <div className="p-5 rounded-2xl bg-blue-950/20 border border-accent-blue/30 space-y-3">
                  <div className="text-xs font-bold text-accent-blue uppercase tracking-wider flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Production Architecture Flow
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {activeCaseStudy.architectureFlow.nodes.map((node, i) => (
                      <React.Fragment key={i}>
                        <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-white">
                          {node}
                        </span>
                        {i < activeCaseStudy.architectureFlow.nodes.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-accent-blue shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Problem & Solution */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">Engineering Problem</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{activeCaseStudy.problem}</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider">Architectural Solution</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{activeCaseStudy.architecture}</p>
                  </div>
                </div>

                {/* Key Implementation Details */}
                <div>
                  <h4 className="text-xs font-bold text-accent-blue uppercase tracking-wider mb-3">Key Technical Implementations</h4>
                  <ul className="space-y-2">
                    {activeCaseStudy.implementation.map((impl, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                        <span>{impl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security, CI/CD, Monitoring, Compliance */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" /> Security & Access Controls
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      {activeCaseStudy.securityControls.map((sec, i) => (
                        <li key={i}>• {sec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5" /> Compliance & Audit Readiness
                    </h4>
                    <p className="text-xs text-gray-300">{activeCaseStudy.compliance}</p>
                  </div>
                </div>

                {/* Challenges & Outcome */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Engineering Challenges</h4>
                    <p className="text-xs text-gray-300">{activeCaseStudy.challenges}</p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" /> Cost & Business Outcome
                    </h4>
                    <p className="text-xs text-gray-300">{activeCaseStudy.outcome} ({activeCaseStudy.costConsiderations})</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-xs text-foreground-muted">
                <span>Role: <strong className="text-white">{activeCaseStudy.role}</strong></span>
                <button
                  onClick={() => setActiveCaseStudy(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
