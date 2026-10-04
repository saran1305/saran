'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Building2, CheckCircle2, Award, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA, CareerRole } from '@/data/portfolioData';

function RoleRow({ role, index, isInView, isLast }: { role: CareerRole; index: number; isInView: boolean; isLast: boolean }) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.55 }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-5 w-4 h-4 rounded-full bg-background border-2 border-accent-blue flex items-center justify-center z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
      </div>

      {/* Timeline line connecting to next */}
      {!isLast && (
        <div className="absolute left-[7px] top-9 bottom-0 w-[2px] bg-gradient-to-b from-accent-blue/40 to-white/5" />
      )}

      {/* Role Card */}
      <div className="glass-card border border-white/10 hover:border-accent-blue/30 transition-all duration-300 mb-6">
        {/* Role Header — always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <span className="text-[11px] font-mono font-bold text-accent-blue uppercase tracking-widest block mb-1">
              {role.period}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{role.title}</h3>
            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">{role.summary}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:block text-xs text-foreground-muted">
              {isExpanded ? 'Collapse' : 'Expand'}
            </span>
            <div className={`w-7 h-7 rounded-lg glass border border-white/10 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-4 h-4 text-accent-blue" />
            </div>
          </div>
        </button>

        {/* Expandable Details */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-1 border-t border-white/5 space-y-5">
                {/* Responsibilities */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-accent-blue mb-3 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" /> Core Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                {role.achievements.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-green-400 mb-3 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" /> Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {role.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {role.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[11px] font-mono text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const company = PORTFOLIO_DATA.careerHistory[0]; // All roles are at same company

  return (
    <section id="experience" ref={sectionRef} className="section relative overflow-hidden bg-background">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
            Career Timeline &amp; Progression
          </span>
          <h2 className="section-title mb-6">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle mx-auto">
            5+ years of continuous growth at a single company, progressing from software engineering to leading Cloud &amp; DevSecOps initiatives.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Company Block Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card border border-accent-blue/30 px-6 py-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            {/* Company Logo placeholder */}
            <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-accent-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{company.company}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-foreground-muted">
                <MapPin className="w-3.5 h-3.5 text-accent-blue" />
                <span>{company.location}</span>
                <span className="text-white/20">•</span>
                <span>Aug 2021 – Present</span>
                <span className="text-white/20">•</span>
                <span className="text-accent-blue font-semibold">4 Roles</span>
              </div>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Currently Employed
              </span>
            </div>
          </motion.div>

          {/* Roles Timeline */}
          <div className="relative">
            {PORTFOLIO_DATA.careerHistory.map((role, idx) => (
              <RoleRow
                key={role.id}
                role={role}
                index={idx}
                isInView={isInView}
                isLast={idx === PORTFOLIO_DATA.careerHistory.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
