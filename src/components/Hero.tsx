'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  GitBranch, Layers, Shield, Package, Cloud, Server,
  Database, Lock, BarChart3, ArrowRight,
  Github, Linkedin, CheckCircle2, ExternalLink,
  Box, RefreshCw,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { useSound } from '@/context/SoundContext';

// ─── Pipeline stages ────────────────────────────────────────────────────
const PIPELINE_STAGES = [
  {
    id: 'commit',
    icon: GitBranch,
    label: '✓ Code committed',
    color: '#60a5fa',
    substeps: null,
  },
  {
    id: 'build',
    icon: Layers,
    label: '✓ Build triggered',
    color: '#a78bfa',
    substeps: null,
  },
  {
    id: 'security',
    icon: Shield,
    label: '✓ Security scanning',
    color: '#fbbf24',
    substeps: ['SAST', 'SCA', 'Secret Scan', 'Container Scan'],
  },
  {
    id: 'artifact',
    icon: Package,
    label: '✓ Artifact created',
    color: '#34d399',
    substeps: null,
  },
  {
    id: 'deploy',
    icon: Cloud,
    label: '✓ Deployment started',
    color: '#60a5fa',
    substeps: null,
  },
  {
    id: 'production',
    icon: Server,
    label: '☁ PRODUCTION',
    color: '#10b981',
    substeps: null,
    isProduction: true,
  },
] as const;

// ─── Cloud nodes ─────────────────────────────────────────────────────────
const CLOUD_NODES = [
  { id: 'github',    label: 'GitHub',            desc: 'Source code & webhooks',              icon: GitBranch, col: 0 },
  { id: 'build',     label: 'Cloud Build',       desc: 'Automated CI/CD pipeline',            icon: Layers,    col: 1 },
  { id: 'registry',  label: 'Artifact Registry', desc: 'Container image storage',             icon: Box,       col: 2 },
  { id: 'cloudrun',  label: 'Cloud Run',         desc: 'Containerized app workloads',         icon: Cloud,     col: 3 },
  { id: 'cloudsql',  label: 'Cloud SQL',         desc: 'Managed database (HA mode)',          icon: Database,  col: 0 },
  { id: 'secrets',   label: 'Secret Manager',    desc: 'Secure runtime secret injection',     icon: Lock,      col: 1 },
  { id: 'storage',   label: 'Cloud Storage',     desc: 'Object storage for static assets',    icon: Package,   col: 2 },
  { id: 'monitor',   label: 'Cloud Monitoring',  desc: 'Observability, alerts & dashboards',  icon: BarChart3, col: 3 },
];

// ─── DevSecOps lifecycle ──────────────────────────────────────────────────
const LIFECYCLE = ['CODE', 'BUILD', 'SCAN', 'SECURE', 'DEPLOY', 'MONITOR'];

// ─── Status items ─────────────────────────────────────────────────────────
const STATUS_ITEMS = [
  { label: 'API',        status: 'READY',   dot: 'bg-emerald-400' },
  { label: 'DATABASE',   status: 'READY',   dot: 'bg-emerald-400' },
  { label: 'CI/CD',      status: 'READY',   dot: 'bg-emerald-400' },
  { label: 'SECURITY',   status: 'ENABLED', dot: 'bg-blue-400'    },
  { label: 'MONITORING', status: 'ACTIVE',  dot: 'bg-emerald-400' },
];

const CMD_TEXT = '$ git push origin main';

export default function Hero() {
  const { isSoundEnabled } = useSound();
  const eng = PORTFOLIO_DATA.engineer;
  const prefersReducedMotion = useReducedMotion();

  // ─── State ──────────────────────────────────────────────────────────────
  const [typedCmd, setTypedCmd]       = useState('');
  const [cmdDone, setCmdDone]         = useState(false);
  const [activeStep, setActiveStep]   = useState(-1);
  const [lifecycleIdx, setLifecycleIdx] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // ─── Sound ──────────────────────────────────────────────────────────────
  const playClickSound = () => {
    if (!isSoundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 800; osc.type = 'sine';
      gain.gain.value = 0.15;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.stop(ctx.currentTime + 0.1);
    } catch { /* ignore */ }
  };

  // ─── Typing animation ───────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedCmd(CMD_TEXT);
      setCmdDone(true);
      setActiveStep(5);
      return;
    }
    let i = 0;
    setTypedCmd('');
    setCmdDone(false);
    const iv = setInterval(() => {
      i++;
      setTypedCmd(CMD_TEXT.slice(0, i));
      if (i >= CMD_TEXT.length) { clearInterval(iv); setCmdDone(true); }
    }, 55);
    return () => clearInterval(iv);
  }, [prefersReducedMotion]);

  // ─── Pipeline animation ─────────────────────────────────────────────────
  useEffect(() => {
    if (!cmdDone || prefersReducedMotion) return;
    let step = 0;
    setActiveStep(0);
    const iv = setInterval(() => {
      step++;
      if (step < PIPELINE_STAGES.length) {
        setActiveStep(step);
      } else {
        clearInterval(iv);
        // Reset cycle after pause
        setTimeout(() => {
          setActiveStep(-1);
          setTypedCmd('');
          setCmdDone(false);
        }, 4500);
      }
    }, 1500);
    return () => clearInterval(iv);
  }, [cmdDone, prefersReducedMotion]);

  // ─── Lifecycle cycling ──────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return;
    const iv = setInterval(() => setLifecycleIdx(p => (p + 1) % LIFECYCLE.length), 950);
    return () => clearInterval(iv);
  }, [prefersReducedMotion]);

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-background"
    >
      {/* Background accent glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-accent-blue/8 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[250px] bg-purple-500/5 blur-[100px] pointer-events-none rounded-full" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">

          {/* ── LEFT: Identity ─────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-5 space-y-7"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-foreground-muted">{eng.noticePeriod} Notice</span>
              <span className="text-white/20">·</span>
              <span className="text-accent-blue">{eng.interviewPreference}</span>
            </div>

            {/* Role label */}
            <div>
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent-blue block mb-3">
                {eng.name} — Senior Cloud &amp; DevSecOps Engineer
              </span>

              {/* H1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
                I BUILD CLOUD{' '}
                <span className="gradient-text-glow">INFRASTRUCTURE</span>{' '}
                THAT SHIPS.
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground-muted leading-relaxed max-w-md">
              Designing secure, automated and production-ready infrastructure across{' '}
              <span className="text-white font-medium">AWS, GCP and Azure</span>.
              CI/CD · Kubernetes · Terraform · DevSecOps · SOC 2 readiness.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={playClickSound}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-blue hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all duration-200"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#blog"
                onClick={playClickSound}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass border border-white/10 hover:border-white/25 text-white font-semibold text-sm transition-all duration-200"
              >
                Read My Blog
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-5 text-foreground-muted">
              <a href={eng.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-white transition-colors">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <span className="text-white/15">|</span>
              <a href={eng.linkedin} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-white transition-colors">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>

            {/* DevSecOps lifecycle bar */}
            <div className="pt-2 border-t border-white/5">
              <div className="text-[10px] font-mono text-foreground-muted mb-2 uppercase tracking-widest">
                Engineering Workflow
              </div>
              <div className="flex items-center gap-0">
                {LIFECYCLE.map((stage, i) => {
                  const isActive = prefersReducedMotion ? true : i === lifecycleIdx;
                  return (
                    <React.Fragment key={stage}>
                      <div
                        className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all duration-300 ${
                          isActive
                            ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40'
                            : 'text-foreground-muted/40'
                        }`}
                      >
                        {stage}
                      </div>
                      {i < LIFECYCLE.length - 1 && (
                        <span className={`text-[10px] mx-0.5 transition-colors duration-300 ${isActive ? 'text-accent-blue/60' : 'text-white/10'}`}>→</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <p className="text-[10px] text-foreground-muted/50 mt-1.5 font-mono italic">
                Secure by design. Automated by default.
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Pipeline ─────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-7 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Terminal Pipeline Card ─────────────────────────── */}
            <div className="glass-card border border-white/10 overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-[11px] font-mono text-foreground-muted">
                    saran@devops-pipeline:~
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Pipeline Active</span>
                </div>
              </div>

              {/* Pipeline body */}
              <div className="p-5 font-mono text-xs bg-black/50 space-y-1 min-h-[280px]">
                {/* Command line */}
                <div className="text-emerald-400 mb-4">
                  {typedCmd}
                  {!cmdDone && (
                    <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
                  )}
                </div>

                {/* Pipeline stages */}
                <div className="space-y-1">
                  {PIPELINE_STAGES.map((stage, idx) => {
                    const isActive    = activeStep >= idx;
                    const isCurrent   = activeStep === idx;
                    const isProd      = 'isProduction' in stage && stage.isProduction;
                    const IconComp    = stage.icon;

                    if (!isActive && !prefersReducedMotion) return null;

                    return (
                      <motion.div
                        key={stage.id}
                        initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Connector line above (except first) */}
                        {idx > 0 && isActive && (
                          <div className="flex items-center ml-1.5 my-0.5">
                            <div className="w-px h-3 bg-white/10" />
                            <div className="text-white/20 ml-1 text-[10px]">↓</div>
                          </div>
                        )}

                        {/* Stage row */}
                        <div
                          className={`flex items-start gap-2.5 rounded-lg px-3 py-2 transition-all duration-300 ${
                            isCurrent && !isProd
                              ? 'bg-white/5 border border-white/10'
                              : isProd && isCurrent
                              ? 'bg-emerald-950/40 border border-emerald-500/30'
                              : ''
                          }`}
                        >
                          {/* Icon */}
                          <IconComp
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: stage.color }}
                          />

                          <div className="flex-1">
                            {/* Label */}
                            <span style={{ color: stage.color }} className="font-bold text-[11px]">
                              {stage.label}
                            </span>

                            {/* Substeps (security scanning) */}
                            {stage.substeps && isActive && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {stage.substeps.map((sub, si) => (
                                  <motion.span
                                    key={sub}
                                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: si * 0.15 }}
                                    className="px-1.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-[9px] font-mono"
                                  >
                                    {sub}
                                  </motion.span>
                                ))}
                              </div>
                            )}

                            {/* Production card */}
                            {isProd && isActive && (
                              <motion.div
                                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="mt-3 p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/25"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-emerald-300 font-bold text-[11px] uppercase tracking-wider">PRODUCTION</span>
                                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    ONLINE
                                  </span>
                                </div>
                                <div className="text-white font-bold text-sm tracking-widest mb-2">GLIDO</div>
                                <a
                                  href="#projects"
                                  onClick={playClickSound}
                                  className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors"
                                >
                                  Explore Architecture <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              </motion.div>
                            )}
                          </div>

                          {/* Spinner for current step */}
                          {isCurrent && !isProd && !prefersReducedMotion && (
                            <RefreshCw className="w-3 h-3 text-white/30 animate-spin shrink-0 mt-0.5" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Cloud Nodes Grid ────────────────────────────────── */}
            <div className="glass border border-white/8 rounded-2xl p-4">
              <div className="text-[10px] font-mono text-foreground-muted uppercase tracking-widest mb-3">
                GCP Infrastructure Stack
              </div>
              <div className="grid grid-cols-4 gap-2">
                {CLOUD_NODES.map((node) => {
                  const IconComp  = node.icon;
                  const isHovered = hoveredNode === node.id;
                  return (
                    <div
                      key={node.id}
                      className="relative group"
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <div
                        className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-200 cursor-default ${
                          isHovered
                            ? 'bg-accent-blue/10 border-accent-blue/30'
                            : 'bg-white/3 border-white/8 hover:border-white/20'
                        }`}
                      >
                        <IconComp
                          className={`w-4 h-4 transition-colors duration-200 ${
                            isHovered ? 'text-accent-blue' : 'text-foreground-muted'
                          }`}
                        />
                        <span className="text-[9px] font-mono text-center text-foreground-muted leading-tight">
                          {node.label}
                        </span>
                      </div>

                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
                          <div className="bg-[#0d1117] border border-white/20 rounded-lg px-2.5 py-1.5 shadow-xl whitespace-nowrap">
                            <div className="text-[10px] font-bold text-white">{node.label}</div>
                            <div className="text-[9px] text-foreground-muted mt-0.5">{node.desc}</div>
                          </div>
                          <div className="w-2 h-2 bg-[#0d1117] border-r border-b border-white/20 rotate-45 mx-auto -mt-1" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Status Panel ────────────────────────────────────── */}
            <div className="glass border border-white/8 rounded-2xl px-4 py-3">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono text-foreground-muted uppercase tracking-widest">
                  Engineering Environment
                </span>
                <span className="text-[10px] font-mono text-foreground-muted/50 italic">
                  Portfolio visualization only
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {STATUS_ITEMS.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                    <span className="text-[8px] font-mono text-white/60 uppercase tracking-wider text-center leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[8px] font-mono text-foreground-muted/50 text-center">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
