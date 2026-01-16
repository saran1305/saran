'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Globe, Database, Shield, Layout, Server, Cloud, Lock, Code2, Terminal } from 'lucide-react';

const skillCategories = [
    {
        title: 'Frontend Architecture',
        icon: Layout,
        skills: ['React.js', 'Redux', 'Redux-Saga', 'Material UI', 'Bootstrap', 'JavaScript', 'HTML5', 'CSS3'],
        color: '#3b82f6', // Blue
        delay: 0
    },
    {
        title: 'Cloud Ecosystem',
        icon: Cloud,
        skills: ['AWS', 'Azure', 'GCP', 'DigitalOcean', 'Vercel', 'Netlify'],
        color: '#8b5cf6', // Violet
        delay: 0.1
    },
    {
        title: 'DevOps & Infrastructure',
        icon: Terminal,
        skills: ['Jenkins', 'Docker', 'Terraform', 'Ansible', 'SaltStack', 'Git', 'Linux', 'YAML'],
        color: '#f59e0b', // Amber
        delay: 0.2
    },
    {
        title: 'Backend & Scripting',
        icon: Code2,
        skills: ['Node.js', 'Python', 'Ruby', 'Shell Scripting'],
        color: '#ec4899', // Pink
        delay: 0.3
    },
    {
        title: 'Observability & Monitoring',
        icon: Shield,
        skills: ['Splunk', 'Prometheus', 'Grafana', 'ELK Stack'],
        color: '#10b981', // Emerald
        delay: 0.4
    }
];

function SkillCategoryCard({
    category,
    index,
    isInView
}: {
    category: typeof skillCategories[0];
    index: number;
    isInView: boolean;
}) {
    const Icon = category.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
            className="group relative h-full"
        >
            <div className="glass-card p-8 h-full hover:border-white/10 transition-colors duration-500 overflow-hidden">
                {/* Ambient Glow */}
                <div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    style={{ background: category.color }}
                />

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center glass border border-white/5 group-hover:scale-110 transition-transform duration-500"
                        style={{ boxShadow: `0 0 20px ${category.color}10` }}
                    >
                        <Icon className="w-6 h-6 transition-colors duration-300" style={{ color: category.color }} />
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                {/* Skills Grid */}
                <div className="flex flex-wrap gap-3 relative z-10">
                    {category.skills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.4 + (index * 0.1) + (i * 0.05), duration: 0.3 }}
                            className="px-4 py-2 rounded-lg text-sm bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default select-none"
                            whileHover={{ scale: 1.05, y: -2 }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="section relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent-glow/5 rounded-full blur-[100px]" />
            </div>

            <div className="container-custom relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
                        Technical Arsenal
                    </span>
                    <h2 className="section-title mb-6">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        A comprehensive ecosystem of tools and frameworks for building modern digital solutions.
                    </p>
                </motion.div>

                {/* Skills Grid - Bento Style */}
                <div className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((category, index) => (
                        <SkillCategoryCard
                            key={category.title}
                            category={category}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
