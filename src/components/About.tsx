'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Cpu, Key, Eye, RefreshCw, DollarSign, Cloud, Terminal, CheckCircle2 } from 'lucide-react';
import { getAssetPath } from '@/utils/config';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

const profileImages = [
  getAssetPath('/profile-slideshow/slide-1.png'),
  getAssetPath('/profile-slideshow/slide-2.png'),
  getAssetPath('/profile-slideshow/slide-3.png'),
];

const principlesList = [
  {
    title: 'Automation First',
    icon: Cpu,
    description: 'Eliminate manual cloud operations through declarative Infrastructure-as-Code (Terraform) and fully automated CI/CD deployment pipelines.',
  },
  {
    title: 'Security by Design',
    icon: ShieldCheck,
    description: 'Embed automated SAST/DAST, container vulnerability scanning, and strict IAM boundaries at every phase of the SDLC.',
  },
  {
    title: 'Least Privilege',
    icon: Key,
    description: 'Scope cloud IAM roles, service accounts, network security groups, and database credentials to minimal required access.',
  },
  {
    title: 'Observable Infrastructure',
    icon: Eye,
    description: 'Establish end-to-end metrics, structured centralized logging, and threshold alerting before pushing workloads to production.',
  },
  {
    title: 'Reliable Deployments',
    icon: RefreshCw,
    description: 'Enforce zero-downtime releases, blue/green or symlink atomic deployments, and automated health-check rollback loops.',
  },
  {
    title: 'Cost-Conscious Architecture',
    icon: DollarSign,
    description: 'Right-size cloud compute instances, leverage serverless scale-to-zero, prune unattached storage, and monitor resource lifecycle costs.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovering) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
      }, 2500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section id="about" ref={sectionRef} className="section relative overflow-hidden bg-background">
      <div className="container-custom relative z-10">
        {/* Main Profile & Intro Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Profile Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-blue/20 to-purple-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative glass-card p-2 overflow-hidden shadow-2xl"
              >
                <div className="relative w-72 h-[26rem] sm:w-80 sm:h-[30rem] md:w-96 md:h-[34rem] overflow-hidden rounded-2xl">
                  {profileImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt="Saran M - Senior Cloud & DevSecOps Engineer"
                      fill
                      className={`object-cover object-top transition-opacity duration-700 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={index === 0}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl z-20">
                  <p className="text-xs text-foreground-muted">Location & Availability</p>
                  <p className="font-semibold text-white text-sm">Chennai, India • Remote Available</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* About Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-sm font-bold text-accent-blue tracking-[0.3em] uppercase block">
              Engineering Profile
            </span>

            <h2 className="section-title">
              Engineering Resilient Cloud Infrastructure & <span className="gradient-text">Automated DevSecOps</span>
            </h2>

            <div className="space-y-4 text-foreground-muted text-base leading-relaxed">
              <p>
                I am a <strong className="text-white">Senior Cloud and DevSecOps Engineer</strong> with 5+ years of hands-on experience designing, deploying, and maintaining production cloud infrastructure across AWS, GCP, and Azure.
              </p>
              <p>
                My focus spans multi-cloud architecture, CI/CD pipeline automation (GitHub Actions, Jenkins, Google Cloud Build), production troubleshooting, container orchestration (Docker, Kubernetes), and security posture management.
              </p>
              <p>
                I specialize in <strong className="text-white">infrastructure audit readiness</strong> for compliance frameworks like <strong className="text-white">SOC 2</strong> and <strong className="text-white">ISO/IEC 27001</strong>, enforcing zero-trust secret management, least-privilege IAM policies, and continuous observability.
              </p>
            </div>

            {/* Technically Meaningful Highlights (Replacing Weak Generic Metrics) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs font-bold text-accent-blue uppercase tracking-wider mb-1">Cloud Platforms</div>
                <div className="text-sm font-bold text-white">AWS • GCP • Azure</div>
                <div className="text-[11px] text-foreground-muted mt-1">Multi-cloud architecture & IaC</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs font-bold text-accent-blue uppercase tracking-wider mb-1">Engineering Focus</div>
                <div className="text-sm font-bold text-white">Cloud • DevOps • DevSecOps</div>
                <div className="text-[11px] text-foreground-muted mt-1">Production infrastructure</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xs font-bold text-accent-blue uppercase tracking-wider mb-1">Production Focus</div>
                <div className="text-sm font-bold text-white">CI/CD • Security • Observability</div>
                <div className="text-[11px] text-foreground-muted mt-1">SOC 2 & ISO 27001 audit ready</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* How I Approach Engineering Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-12 border-t border-white/10"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-accent-blue tracking-[0.3em] uppercase block mb-2">
              Engineering Mindset
            </span>
            <h3 className="text-3xl font-bold text-white">How I Approach Engineering</h3>
            <p className="text-sm text-foreground-muted mt-2 max-w-xl mx-auto">
              Core architectural principles guiding every production system I design and deploy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principlesList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="glass-card p-6 border border-white/10 space-y-3 hover:border-accent-blue/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-accent-blue">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-foreground-muted leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
