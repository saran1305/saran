'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code, Package, Rocket, Activity, Terminal, ChevronRight, CheckCircle2 } from 'lucide-react';

const pipelineStages = [
    {
        id: 'code',
        name: 'Code Commit',
        icon: Code,
        color: '#3b82f6',
        status: 'VERSION CONTROL',
        logs: [
            '> git add .',
            '> git commit -m "feat: implement command center"',
            '> git push origin main',
            '[SUCCESS] Pushed to branch \'main\'',
            '> Triggering GitHub Action: CI-Pipeline...'
        ]
    },
    {
        id: 'build',
        name: 'Build & Test',
        icon: Package,
        color: '#22c55e',
        status: 'CI PIPELINE',
        logs: [
            '> docker build -t portfolio-app:latest .',
            '[INFO] Optimization enabled',
            '[INFO] Minifying assets...',
            '> npm run test:unit',
            '[SUCCESS] Build completed in 4.2s',
            '> Pushing image to ECR...'
        ]
    },
    {
        id: 'deploy',
        name: 'Infrastructure',
        icon: Rocket,
        color: '#f59e0b',
        status: 'TERRAFORM APPLY',
        logs: [
            '> terraform init',
            '[AWS] Provisioning EC2 instance (t3.micro)...',
            '[AWS] Configuring load balancer...',
            '> kubectl apply -f deployment.yaml',
            '[SUCCESS] Service exposed on port 80',
            '> Verifying health checks...'
        ]
    },
    {
        id: 'monitor',
        name: 'Observability',
        icon: Activity,
        color: '#a855f7',
        status: 'LIVE METRICS',
        logs: [
            '> connecting to Splunk forwarder...',
            '[METRICS] CPU: 45% | MEM: 60%',
            '[LOGS] 200 OK - GET /api/health',
            '[LOGS] 200 OK - GET /home',
            '[ALERT] Anomalies: None detected',
            '> Grafana dashboard: ACTIVE'
        ]
    },
];

function TerminalConsole({ stage }: { stage: typeof pipelineStages[0] }) {
    const [lines, setLines] = useState<string[]>([]);

    // Reset and animate logs when stage changes
    useEffect(() => {
        setLines([]);
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < stage.logs.length) {
                setLines(prev => {
                    const newLine = stage.logs[currentIndex];
                    return newLine ? [...prev, newLine] : prev;
                });
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 800);

        return () => clearInterval(interval);
    }, [stage]);

    return (
        <div className="h-full bg-black/80 rounded-2xl border border-white/10 p-6 font-mono text-sm overflow-hidden flex flex-col relative">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">console.log</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
            </div>

            {/* Logs Area */}
            <div className="flex-1 space-y-2">
                <AnimatePresence mode="popLayout">
                    {lines.map((line, i) => (
                        <motion.div
                            key={`${stage.id}-${i}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3"
                        >
                            <span className="text-gray-600 select-none">$</span>
                            <span style={{
                                color: (line || '').includes('[SUCCESS]') ? '#4ade80' :
                                    (line || '').includes('[INFO]') ? '#60a5fa' :
                                        (line || '').includes('[AWS]') ? '#f59e0b' :
                                            (line || '').includes('[ALERT]') ? '#f472b6' : '#e5e7eb'
                            }}>
                                {line}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="animate-pulse text-gray-500 mt-2">_</div>
            </div>

            {/* Status Footer */}
            <div className="absolute bottom-4 right-6 text-xs font-bold tracking-widest" style={{ color: stage.color }}>
                STATUS: {stage.status}
            </div>
        </div>
    );
}

import { useSound } from '@/context/SoundContext';

export default function DevOpsPlayground() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [activeStage, setActiveStage] = useState(0);
    const { isSoundEnabled } = useSound();

    const playClickSound = () => {
        if (isSoundEnabled) {
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.2; // Consistent boosted volume

            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    };

    return (
        <section
            id="devops"
            ref={sectionRef}
            className="section relative overflow-hidden"
        >
            <div className="container-custom relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm text-accent-blue tracking-[0.3em] uppercase mb-4 block">
                        Infrastructure Dashboard
                    </span>
                    <h2 className="section-title mb-6">
                        DevOps <span className="gradient-text">Command Center</span>
                    </h2>
                </motion.div>

                {/* Main Dashboard Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 h-auto lg:h-[500px]">

                    {/* LEFT COLUMN: Controls */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {pipelineStages.map((stage, index) => {
                            const Icon = stage.icon;
                            const isActive = activeStage === index;
                            return (
                                <motion.div
                                    key={stage.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => {
                                        setActiveStage(index);
                                        playClickSound();
                                    }}
                                    className={`relative group cursor-pointer p-4 rounded-xl border transition-all duration-300 overflow-hidden ${isActive
                                        ? 'bg-white/5 border-white/20'
                                        : 'bg-transparent border-transparent hover:bg-white/5'
                                        }`}
                                >
                                    {/* Active Highlight Line */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeGlow"
                                            className="absolute left-0 top-0 bottom-0 w-1"
                                            style={{ backgroundColor: stage.color }}
                                        />
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-white/10' : 'bg-white/5'
                                                    }`}
                                            >
                                                <Icon size={20} style={{ color: isActive ? stage.color : '#6b7280' }} />
                                            </div>
                                            <div>
                                                <h4 className={`font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                                    {stage.name}
                                                </h4>
                                                <p className="text-xs text-gray-500">Stage 0{index + 1}</p>
                                            </div>
                                        </div>

                                        <ChevronRight
                                            size={16}
                                            className={`transition-transform duration-300 ${isActive ? 'text-white translate-x-1' : 'text-gray-600'}`}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* RIGHT COLUMN: Terminal Console */}
                    <div className="lg:col-span-8 h-[400px] lg:h-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="h-full"
                        >
                            <TerminalConsole key={activeStage} stage={pipelineStages[activeStage]} />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
