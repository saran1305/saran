'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Cloud, Database, Activity, Code, Server, ArrowUpRight } from 'lucide-react';

type ProjectDomain = 'development' | 'cloud-devops';

const projects = [
    {
        id: 1,
        title: 'GRC Application Deployment',
        domain: 'cloud-devops' as ProjectDomain,
        category: 'Cloud Infrastructure',
        description: 'Deployed a secure, full-stack GRC application on AWS with automated CI/CD pipelines and disaster recovery.',
        icon: Server,
        technologies: ['AWS EC2', 'Jenkins', 'Splunk', 'Nginx', 'SSL'],
        metrics: [
            { label: 'Uptime', value: '99.99%' },
            { label: 'Backup', value: 'Auto S3' },
        ],
        color: '#3b82f6', // Blue
    },
    {
        id: 2,
        title: 'Talent Search Application',
        domain: 'cloud-devops' as ProjectDomain,
        category: 'DevOps Automation',
        description: 'Orchestrated auto-scaling AWS architecture for a high-traffic talent search platform with comprehensive monitoring.',
        icon: Cloud,
        technologies: ['AWS AutoScaling', 'CloudWatch', 'PostgreSQL', 'Linux'],
        metrics: [
            { label: 'Scaling', value: 'Dynamic' },
            { label: 'Security', value: 'IAM/SES' },
        ],
        color: '#8b5cf6', // Violet
    },
    {
        id: 3,
        title: 'Data-Driven Alarm Control',
        domain: 'development' as ProjectDomain,
        category: 'Frontend Engineering',
        description: 'Engineered a complex calculation engine and visualization platform for real-time industrial alarm management.',
        icon: Activity,
        technologies: ['React.js', 'Algorithms', 'Data Viz', 'UI/UX'],
        metrics: [
            { label: 'Latency', value: 'Real-time' },
            { label: 'Reliability', value: '100%' },
        ],
        color: '#f59e0b', // Amber
    },
    {
        id: 4,
        title: 'Market Demand Forecast',
        domain: 'development' as ProjectDomain,
        category: 'Business Intelligence',
        description: 'Developed an interactive forecasting dashboard visualizing 48 months of data with dynamic charts and complex tables.',
        icon: ArrowUpRight,
        technologies: ['React.js', 'Chart.js', 'REST APIs', 'Syncfusion'],
        metrics: [
            { label: 'Data', value: '48 Months' },
            { label: 'Trends', value: 'Predictive' },
        ],
        color: '#10b981', // Emerald
    },
];

function ProjectCard({
    project,
    index,
}: {
    project: typeof projects[0];
    index: number;
}) {
    const Icon = project.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative"
        >
            <div className="relative h-full glass-card p-8 overflow-hidden transition-all duration-500 hover:translate-y-[-5px] hover:shadow-2xl">
                {/* Background Gradient & Glow */}
                <div
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    style={{ background: project.color }}
                />

                {/* Header */}
                <div className="relative z-10 flex justify-between items-start mb-6">
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center glass border border-white/10"
                        style={{ boxShadow: `0 0 20px ${project.color}20` }}
                    >
                        <Icon className="w-7 h-7" style={{ color: project.color }} />
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/5 bg-white/5 text-foreground-muted">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                        {project.title}
                    </h3>
                    <p className="text-foreground-muted mb-6 leading-relaxed line-clamp-3">
                        {project.description}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {project.metrics.map((metric) => (
                            <div key={metric.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                                <div className="text-lg font-bold" style={{ color: project.color }}>
                                    {metric.value}
                                </div>
                                <div className="text-xs text-foreground-muted uppercase tracking-wider">
                                    {metric.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer / Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                        {project.technologies.map((tech) => (
                            <span key={tech} className="text-xs text-foreground-muted px-2 py-1 rounded-md bg-white/5">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover overlay border */}
                <div
                    className="absolute inset-0 rounded-[inherit] border-2 border-transparent group-hover:border-white/10 pointer-events-none transition-colors duration-500"
                />
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [filter, setFilter] = useState<'all' | ProjectDomain>('all');

    const filteredProjects = projects.filter(p => filter === 'all' || p.domain === filter);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="section relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container-custom relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
                        Featured Work
                    </span>
                    <h2 className="section-title mb-6">
                        Project <span className="gradient-text">Showcase</span>
                    </h2>
                    <p className="section-subtitle mx-auto mb-12">
                        Designing scalable architectures and intuitive digital experiences.
                    </p>

                    {/* Filter Tabs */}
                    <div className="inline-flex p-1 rounded-2xl glass border border-white/10 mx-auto">
                        {(['all', 'development', 'cloud-devops'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${filter === tab ? 'text-white' : 'text-foreground-muted hover:text-white'
                                    }`}
                            >
                                {filter === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-accent-blue/20 rounded-xl border border-accent-blue/30"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 capitalize">
                                    {tab === 'cloud-devops' ? 'Cloud & DevOps' : tab === 'development' ? 'Full Stack Development' : 'All Projects'}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 gap-6 lg:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
