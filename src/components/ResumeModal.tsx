'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const eng = PORTFOLIO_DATA.engineer;

  const handleDownload = () => {
    // Generates a clean text download or opens resume link
    const link = document.createElement('a');
    link.href = 'https://saran1305.github.io/saran/saran-resume.pdf';
    link.target = '_blank';
    link.download = 'Saran_M_Senior_Cloud_DevSecOps_Engineer_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0d12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-accent-blue" />
                <h3 className="font-semibold text-white">Saran M — Resume Overview</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-accent-blue hover:bg-blue-600 text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-foreground-muted hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Document Preview */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 text-foreground-muted text-sm leading-relaxed">
              {/* Header */}
              <div className="border-b border-white/10 pb-6">
                <h1 className="text-3xl font-bold text-white mb-2">{eng.name}</h1>
                <p className="text-lg font-medium text-accent-blue mb-4">{eng.title}</p>
                <div className="flex flex-wrap gap-4 text-xs text-foreground-muted">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accent-blue" /> {eng.location}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-accent-blue" /> {eng.phone}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-accent-blue" /> {eng.email}</span>
                  <a href={eng.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white"><Linkedin className="w-3.5 h-3.5 text-accent-blue" /> LinkedIn</a>
                  <a href={eng.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white"><Github className="w-3.5 h-3.5 text-accent-blue" /> GitHub</a>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-2">Professional Summary</h2>
                <p className="text-gray-300">{eng.summary}</p>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-3">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(PORTFOLIO_DATA.capabilityMap).map(([key, domain]) => (
                    <div key={key} className="p-3 rounded-lg glass border border-white/5">
                      <div className="font-semibold text-white text-xs mb-1">{domain.title}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {domain.items.map((item) => (
                          <span key={item} className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-gray-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-4">Work Experience</h2>
                <div className="space-y-6">
                  {PORTFOLIO_DATA.careerHistory.map((role) => (
                    <div key={role.id} className="border-l-2 border-accent-blue/30 pl-4 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <h3 className="font-bold text-white text-base">{role.title}</h3>
                        <span className="text-xs text-accent-blue font-medium">{role.period}</span>
                      </div>
                      <div className="text-xs text-gray-400 font-medium">{role.company} | {role.location}</div>
                      <ul className="space-y-1 mt-2">
                        {role.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Projects */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-3">Key Featured Projects</h2>
                <div className="space-y-3">
                  {PORTFOLIO_DATA.caseStudies.map((cs) => (
                    <div key={cs.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white">{cs.title} — {cs.subtitle}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">{cs.category}</span>
                      </div>
                      <p className="text-xs text-gray-300 mb-2">{cs.summary}</p>
                      <div className="text-[11px] text-gray-400 font-mono">
                        Architecture Flow: {cs.architectureFlow.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-xs text-foreground-muted">
              <span>Notice Period: <strong className="text-white">Fully Negotiable</strong> | Remote Interviews: <strong className="text-white">Yes</strong></span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
