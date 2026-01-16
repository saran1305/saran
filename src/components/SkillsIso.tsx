'use client';

import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: "Front-End",
        color: "from-blue-400 to-cyan-300",
        skills: ["React", "Next.js", "Tailwind", "Three.js", "Framer"]
    },
    {
        title: "Back-End",
        color: "from-emerald-400 to-teal-300",
        skills: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"]
    },
    {
        title: "DevOps",
        color: "from-purple-400 to-pink-300",
        skills: ["AWS", "Docker", "K8s", "Terraform", "CI/CD"]
    }
];

export default function SkillsIso() {
    return (
        <div className="relative min-h-[600px] flex items-center justify-center perspective-[1000px] overflow-hidden">
            <div className="relative transform-style-3d rotate-x-60 rotate-z-[-20deg] scale-75 lg:scale-100 grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
                {skillCategories.map((cat, i) => (
                    <div key={cat.title} className="flex flex-col gap-6">
                        {/* Category Header Plinth */}
                        <div className="relative w-48 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg transform translate-z-10 shadow-xl flex items-center justify-center">
                            <span className={`font-bold bg-clip-text text-transparent bg-gradient-to-r ${cat.color} uppercase tracking-wider`}>
                                {cat.title}
                            </span>
                        </div>

                        {/* Skill Cubes */}
                        {cat.skills.map((skill, j) => (
                            <motion.div
                                key={skill}
                                whileHover={{ z: 20, scale: 1.1 }}
                                className="relative w-48 h-16 group cursor-pointer"
                            >
                                {/* Card Body */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl shadow-2xl flex items-center justify-between px-4 transition-all duration-300 group-hover:border-white/30 group-hover:bg-gray-800">
                                    <span className="text-gray-200 font-semibold">{skill}</span>
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cat.color} shadow-[0_0_10px_currentColor]`} />
                                </div>

                                {/* Hover Reflection */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 text-white/20 text-sm uppercase tracking-[0.5em]">
                Detailed Infrastructure View
            </div>
        </div>
    );
}
