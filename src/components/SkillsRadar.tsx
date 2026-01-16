'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
    { name: 'React.js', category: 'Frontend', level: 95 },
    { name: 'AWS', category: 'Cloud', level: 90 },
    { name: 'TypeScript', category: 'Frontend', level: 85 },
    { name: 'Docker', category: 'DevOps', level: 88 },
    { name: 'Kubernetes', category: 'DevOps', level: 82 },
    { name: 'Next.js', category: 'Frontend', level: 92 },
    { name: 'Terraform', category: 'Cloud', level: 85 },
    { name: 'Node.js', category: 'Backend', level: 80 },
];

export default function SkillsRadar() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <div className="relative min-h-[600px] flex items-center justify-center bg-black/40 rounded-3xl overflow-hidden border border-white/5" ref={containerRef}>

            {/* Radar Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_70%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-cyan-500/30 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-cyan-500/20 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-cyan-500/10 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-cyan-500/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-cyan-500/20" />
            </div>

            {/* Rotating Scanner */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none origin-center"
            >
                <div className="w-1/2 h-full absolute right-0 bg-gradient-to-l from-cyan-500/20 to-transparent blur-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }} />
            </motion.div>

            {/* Skills Blips */}
            <div className="relative z-10 w-[500px] h-[500px]">
                {skills.map((skill, i) => {
                    // Calculate random positions effectively circular
                    const angle = (i / skills.length) * 2 * Math.PI;
                    const radius = 120 + Math.random() * 100;
                    const x = Math.cos(angle) * radius + 250; // center offset
                    const y = Math.sin(angle) * radius + 250;

                    return (
                        <motion.div
                            key={skill.name}
                            className="absolute group cursor-pointer"
                            style={{ top: y, left: x }}
                            whileHover={{ scale: 1.2, zIndex: 10 }}
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                        >
                            <div className={`relative flex items-center justify-center
                ${skill.category === 'Frontend' ? 'text-blue-400' :
                                    skill.category === 'Backend' ? 'text-green-400' :
                                        'text-purple-400'}
              `}>
                                {/* Blip Dot */}
                                <span className="w-3 h-3 bg-current rounded-full shadow-[0_0_10px_currentColor] animate-pulse" />

                                {/* Ping Effect */}
                                <motion.span
                                    className="absolute w-full h-full bg-current rounded-full opacity-0"
                                    animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                />

                                {/* Label (Always visible on hover, or fade in/out with scanner?) */}
                                <div className="absolute left-4 px-3 py-1 bg-black/80 backdrop-blur-sm border border-white/10 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="font-mono text-sm font-bold">{skill.name}</span>
                                    <div className="text-xs text-white/50">{skill.level}% Proficiency</div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="absolute bottom-4 left-4 font-mono text-xs text-cyan-500/50">
                SCANNING SECTOR: TECHNICAL_STACK
            </div>
        </div>
    );
}
