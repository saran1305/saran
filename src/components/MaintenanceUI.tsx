'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Cpu } from 'lucide-react';
import ServerRackScene from '@/components/ServerRackScene';

export default function MaintenanceUI() {
    const [progress, setProgress] = useState(0);
    const [statusLog, setStatusLog] = useState('Initializing system upgrade...');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 2;
            });
        }, 200);

        const logs = [
            { pct: 10, msg: 'Backing up databases...' },
            { pct: 30, msg: 'Optimizing assets...' },
            { pct: 50, msg: 'Updating security protocols...' },
            { pct: 75, msg: 'Compiling holographic interface...' },
            { pct: 90, msg: 'Finalizing deployment...' },
            { pct: 99, msg: 'Rebooting systems...' },
        ];

        const logInterval = setInterval(() => {
            setProgress(current => {
                const log = logs.find(l => Math.floor(current) === l.pct);
                if (log) setStatusLog(log.msg);
                return current;
            });
        }, 100);

        return () => {
            clearInterval(interval);
            clearInterval(logInterval);
        };
    }, []);

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-black text-white font-mono z-[99999]">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-80">
                <ServerRackScene />
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute inset-0 z-10 pointer-events-none" style={{
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%'
            }}></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-4 text-cyan-400">
                        <Cpu className="w-5 h-5 animate-pulse" />
                        <span className="tracking-[0.5em] text-xs uppercase">System Maintenance</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse">
                        SYSTEM UPGRADE
                    </h1>
                    <p className="text-gray-400 max-w-md mx-auto mt-4 text-sm md:text-base">
                        Our servers are currently undergoing a scheduled quantum enhancement. We will remain offline for a short duration.
                    </p>
                </motion.div>

                {/* Progress Section */}
                <div className="w-full max-w-xl mx-auto backdrop-blur-md bg-black/40 border border-cyan-500/30 p-8 rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors duration-500"></div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3 text-cyan-300">
                                <Terminal className="w-4 h-4" />
                                <span>{statusLog}</span>
                            </div>
                            <span className="font-bold text-cyan-400">{Math.floor(progress)}%</span>
                        </div>

                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                            </motion.div>
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                <span>Secure Connection</span>
                            </div>
                            <span>Est. Remaining: 12m 30s</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-12"
                >
                    <a href="mailto:shreecharan1305@gmail.com" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-cyan-500/50 transition-all text-sm text-gray-400 hover:text-cyan-400">
                        Contact Support
                    </a>
                </motion.div>

            </div>
        </main>
    );
}
