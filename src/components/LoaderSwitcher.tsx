'use client';

import React, { useState } from 'react';
import LoaderTerminal from './LoaderTerminal';
import LoaderCloud from './LoaderCloud';
import LoaderConstellation from './LoaderConstellation';

export default function LoaderSwitcher({ onComplete }: { onComplete?: () => void }) {
    const [index, setIndex] = useState(0);
    const loaders = [
        { name: 'Cinematic Terminal', Component: LoaderTerminal },
        { name: 'Cloud Fortress', Component: LoaderCloud },
        { name: 'Code Constellation', Component: LoaderConstellation },
    ];

    const ActiveLoader = loaders[index].Component;

    const next = () => setIndex((prev) => (prev + 1) % loaders.length);
    const prev = () => setIndex((prev) => (prev - 1 + loaders.length) % loaders.length);

    return (
        <section className="fixed inset-0 z-[9999] bg-black">
            {/* Render Active Loader */}
            <div className="absolute inset-0">
                <ActiveLoader onComplete={() => { }} /> {/* Disable auto-complete for review */}
            </div>

            {/* Switcher UI */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-50">
                <button
                    onClick={prev}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition text-sm"
                >
                    ←
                </button>
                <div className="px-6 py-2 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10 text-sm font-mono whitespace-nowrap">
                    {index + 1} / 3 : {loaders[index].name}
                </div>
                <button
                    onClick={next}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition text-sm"
                >
                    →
                </button>
            </div>

            <button
                onClick={onComplete}
                className="absolute top-10 right-10 px-6 py-2 bg-emerald-500/80 hover:bg-emerald-500 text-white rounded-full backdrop-blur-md transition text-sm font-bold shadow-lg shadow-emerald-500/20"
            >
                SELECT THIS CONCEPT
            </button>
        </section>
    );
}
