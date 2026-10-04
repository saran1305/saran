'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Terminal, CheckCircle2, ArrowRight, ShieldAlert, Cpu, HardDrive, Database, Network, Search, Layers, Server } from 'lucide-react';
import { PORTFOLIO_DATA, TroubleshootingIncident } from '@/data/portfolioData';

const methodologySteps = [
  { step: '1. Application', icon: Server, desc: 'Check HTTP status codes, error logs, worker pool availability & process crash state.' },
  { step: '2. Load', icon: Layers, desc: 'Analyze active incoming request volume, throughput (RPS), and traffic origin spikes.' },
  { step: '3. CPU / Memory', icon: Cpu, desc: 'Inspect thread stack dumps, memory heap allocation, and kernel CPU throttling.' },
  { step: '4. Disk I/O', icon: HardDrive, desc: 'Check disk I/O wait times, IOPS limits, write queue depth & un-cleared log files.' },
  { step: '5. Network', icon: Network, desc: 'Inspect latency, packet loss, DNS resolution delays, and active TCP socket states.' },
  { step: '6. Database', icon: Database, desc: 'Inspect connection pool limits, slow query logs, lock contention & index usage.' },
  { step: '7. Logs', icon: Search, desc: 'Correlate centralized CloudWatch/GCP log entries using trace IDs and error tags.' },
  { step: '8. Deployment History', icon: Terminal, desc: 'Check recent git release tags, environment config changes & infrastructure updates.' },
];

export default function ProductionLessons() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedIncident, setSelectedIncident] = useState<TroubleshootingIncident>(PORTFOLIO_DATA.incidents[0]);

  return (
    <section
      id="incidents"
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
            Production Credibility & Reliability
          </span>
          <h2 className="section-title mb-6">
            Production <span className="gradient-text">Lessons & Incident Analysis</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Demonstrating real troubleshooting methodology, root-cause diagnosis, and preventative architectural fixes on active cloud infrastructure.
          </p>
        </motion.div>

        {/* Systematic Troubleshooting Methodology Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16 glass-card p-6 md:p-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-5 h-5 text-accent-blue" />
            <h3 className="text-xl font-bold text-white">Production Incident Diagnostic Protocol</h3>
          </div>
          <p className="text-sm text-foreground-muted mb-6">
            When production metrics degrade, I follow a strict systematic diagnostic order to isolate root causes without guessing:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {methodologySteps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="w-4 h-4 text-accent-blue" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{item.step}</span>
                    </div>
                    <p className="text-xs text-foreground-muted leading-normal">{item.desc}</p>
                  </div>
                  {idx < methodologySteps.length - 1 && (
                    <div className="hidden lg:block text-right mt-2 text-white/20">
                      <ArrowRight className="w-4 h-4 inline" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Interactive Incident Case Study Breakdown */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Incident Selector List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-yellow-500" />
              Sanitized Real-World Incidents
            </h3>
            {PORTFOLIO_DATA.incidents.map((incident) => (
              <motion.button
                key={incident.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedIncident(incident)}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  selectedIncident.id === incident.id
                    ? 'bg-blue-950/40 border-accent-blue shadow-lg shadow-blue-500/10'
                    : 'glass border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-white/10 text-accent-blue">
                    {incident.category}
                  </span>
                  <span className="text-xs text-foreground-muted">Sanitized Post-Mortem</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{incident.title}</h4>
                <p className="text-xs text-foreground-muted line-clamp-2">{incident.symptom}</p>
              </motion.button>
            ))}
          </div>

          {/* Incident Details Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIncident.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-6 md:p-8 border border-white/10 space-y-6"
              >
                {/* Header */}
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-4 h-4" /> Production Incident Breakdown
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedIncident.title}</h3>
                </div>

                {/* Symptom */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-2">Symptom</h4>
                  <p className="text-sm text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5">
                    {selectedIncident.symptom}
                  </p>
                </div>

                {/* Investigation Flow */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-2">Investigation Steps</h4>
                  <ul className="space-y-2">
                    {selectedIncident.investigation.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Root Cause */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">Root Cause Identified</h4>
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-red-200">
                    {selectedIncident.rootCause}
                  </div>
                </div>

                {/* Resolution & Prevention */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-green-400 mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Immediate Resolution
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedIncident.resolution.map((res, i) => (
                        <li key={i} className="text-xs text-gray-300">• {res}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Long-Term Prevention
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedIncident.prevention.map((prev, i) => (
                        <li key={i} className="text-xs text-gray-300">• {prev}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedIncident.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-foreground-muted border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
