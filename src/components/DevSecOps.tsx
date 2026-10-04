'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Shield, Lock, FileCheck, CheckCircle2, ArrowRight, ShieldCheck, Key, Eye, Server, Terminal, AlertCircle } from 'lucide-react';
import { PORTFOLIO_DATA, DevSecOpsPhase } from '@/data/portfolioData';

export default function DevSecOps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activePhase, setActivePhase] = useState<DevSecOpsPhase>(PORTFOLIO_DATA.devSecOpsPhases[0]);

  return (
    <section
      id="devsecops"
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
            Shift-Left Security & Audit Readiness
          </span>
          <h2 className="section-title mb-6">
            Security & <span className="gradient-text">DevSecOps Lifecycle</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Embedding security controls, automated vulnerability scanning, IAM least-privilege policies, and audit logging into every phase of the SDLC.
          </p>
        </motion.div>

        {/* Visual Interactive DevSecOps Lifecycle Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12 overflow-x-auto pb-4 scrollbar-hide"
        >
          <div className="flex items-center justify-between min-w-[800px] gap-2 p-2 rounded-2xl glass border border-white/10">
            {PORTFOLIO_DATA.devSecOpsPhases.map((phase) => {
              const isActive = activePhase.id === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase)}
                  className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    isActive
                      ? 'bg-accent-blue text-white shadow-lg shadow-blue-500/20'
                      : 'text-foreground-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck className={`w-4 h-4 ${isActive ? 'text-white' : 'text-accent-blue'}`} />
                  <span className="whitespace-nowrap">{phase.title}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Lifecycle Phase Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 md:p-10 border border-white/10 mb-16"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">DevSecOps Lifecycle Phase</span>
                  <h3 className="text-3xl font-bold text-white mt-1">{activePhase.title}</h3>
                  <p className="text-sm text-foreground-muted mt-3 leading-relaxed">{activePhase.description}</p>
                </div>

                {/* Security Controls */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Active Security Controls
                  </h4>
                  <div className="space-y-2">
                    {activePhase.securityControls.map((control, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-xs text-gray-200 font-medium">{control}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                {/* Tools Utilized */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Tools & Engineering Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activePhase.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Audit Impact Note */}
                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
                    <FileCheck className="w-4 h-4" /> Audit & Compliance Impact
                  </h4>
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    Directly addresses SOC 2 Security & Confidentiality Criteria and ISO/IEC 27001 A.12 Operational Security controls by generating immutable audit logs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Security & Audit Readiness Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">SOC 2 & ISO 27001 Readiness</h4>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Experience structuring infrastructure for audit compliance, access control matrices, change tracking, and disaster recovery verification.
            </p>
          </div>

          <div className="glass-card p-6 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <Key className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">Zero Secrets in Code</h4>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Enforce Secret Manager (GCP / AWS) injection at runtime. Secrets are never stored in git commits, environment files, or container image layers.
            </p>
          </div>

          <div className="glass-card p-6 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">IAM & Least Privilege</h4>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Role-based access controls (RBAC), scoped service account permissions, and VPC Service Controls enforcing private internal cloud routing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
