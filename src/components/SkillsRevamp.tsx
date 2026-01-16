'use client';

import React, { useState } from 'react';
import SkillsRadar from './SkillsRadar';
import SkillsIso from './SkillsIso';
import SkillsUniverse from './SkillsUniverse';

export default function SkillsRevamp() {
    const [index, setIndex] = useState(0);
    const options = [
        { name: 'Tech Radar (Monitoring)', Component: SkillsRadar },
        { name: 'Iso-Grid (Architectural)', Component: SkillsIso },
        { name: 'Skill Universe (Interactive)', Component: SkillsUniverse },
    ];

    const ActiveComponent = options[index].Component;

    return (
        <section className="py-20 bg-black text-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-2">
                        Skills Prototypes
                    </h2>
                    <p className="text-gray-400">Select a concept to preview</p>
                </div>

                {/* Switcher Controls */}
                <div className="flex justify-center gap-4 mb-10">
                    {options.map((opt, i) => (
                        <button
                            key={opt.name}
                            onClick={() => setIndex(i)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${i === index
                                    ? 'bg-white text-black shadow-lg shadow-white/20'
                                    : 'bg-white/5 text-white/50 hover:bg-white/10'
                                }`}
                        >
                            {opt.name}
                        </button>
                    ))}
                </div>

                {/* Preview Area */}
                <div className="w-full max-w-5xl mx-auto border border-white/10 rounded-3xl p-2 bg-white/5 backdrop-blur-sm">
                    <ActiveComponent />
                </div>
            </div>
        </section>
    );
}
