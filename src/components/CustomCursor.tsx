'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useSound } from '@/context/SoundContext';

// --- Audio Synthesizer for "Sparkling" Sound ---
class SparkleSound {
    private ctx: AudioContext | null = null;
    private lastPlayTime: number = 0;

    constructor() {
        if (typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
    }

    play() {
        if (!this.ctx || this.ctx.state === 'suspended') {
            this.ctx?.resume();
        }
        if (!this.ctx) return;

        // Throttle sounds to prevent cacophony
        const now = Date.now();
        if (now - this.lastPlayTime < 40) return; // Limit to ~25 sounds/sec max
        this.lastPlayTime = now;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // "Fairy dust" sound: High pitch, random variation, very short decay
        // Frequencies between 1200Hz and 3000Hz (sparkly range)
        const freq = 1200 + Math.random() * 1800;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Volume envelope
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime); // Increased from 0.02
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    destroy() {
        if (this.ctx && this.ctx.state !== 'closed') {
            this.ctx.close();
        }
    }
}

// --- Canvas Particle System for "Visual Sparkles" ---
class SparkleSystem {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number;
        size: number;
        color: string;
    }> = [];
    private width: number = 0;
    private height: number = 0;
    private animationId: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.resize = this.resize.bind(this); // Bind method
        this.resize();
        window.addEventListener('resize', this.resize);
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    addParticle(x: number, y: number) {
        // Add minimal stars/dots
        const colors = ['#ffffff', '#e2e8f0', '#38bdf8']; // White, Silver, Light Blue
        this.particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 1.5, // Gentle drift
            vy: (Math.random() - 0.5) * 1.5,
            life: 1.0,
            size: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02; // Fade out speed

            // Draw Star/Sparkle
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        this.ctx.globalAlpha = 1;
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.resize);
    }
}

// --- Canvas Particle System for "Visual Sparkles" ---


export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const soundRef = useRef<SparkleSound | null>(null);
    const particlesRef = useRef<SparkleSystem | null>(null);
    const { isSoundEnabled } = useSound();

    // Use a ref to access the latest sound state inside the event listener closure
    // without triggering a full re-initialization of the particle system
    const isSoundEnabledRef = useRef(isSoundEnabled);

    useEffect(() => {
        isSoundEnabledRef.current = isSoundEnabled;
    }, [isSoundEnabled]);

    // Optimized Motion Values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring Config
    const springConfig = { damping: 30, stiffness: 400, mass: 0.8 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Initialize Sound & Visuals
        soundRef.current = new SparkleSound();
        if (canvasRef.current) {
            particlesRef.current = new SparkleSystem(canvasRef.current);
        }

        const handleMouseMove = (e: MouseEvent) => {
            // 1. Update Main Cursor (Direct MotionValue - Zero Lag)
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            if (!isVisible) setIsVisible(true);

            // 2. Add Sparkle Visuals (Canvas - High Perf)
            if (particlesRef.current && Math.random() > 0.5) { // 50% chance per frame to control density
                particlesRef.current.addParticle(e.clientX, e.clientY);
            }

            // 3. Play Sparkle Sound (Throttled Web Audio)
            if (isSoundEnabledRef.current && soundRef.current && Math.random() > 0.8) {
                soundRef.current.play();
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                cursorX.set(touch.clientX);
                cursorY.set(touch.clientY);

                if (!isVisible) setIsVisible(true);

                // Higher density for touch (90% chance) to ensure it's visible under finger
                if (particlesRef.current && Math.random() > 0.1) {
                    particlesRef.current.addParticle(touch.clientX, touch.clientY);
                }

                // More frequent sound on mobile to match the tactile feel
                if (isSoundEnabledRef.current && soundRef.current && Math.random() > 0.7) {
                    soundRef.current.play();
                }
            }
        };

        const handleMouseDown = () => setIsVisible(true);
        const handleTouchStart = (e: TouchEvent) => {
            setIsVisible(true);
            // Ensure audio context is resumed on first touch
            if (isSoundEnabledRef.current && soundRef.current) {
                soundRef.current.play();
            }
            // Spawn a burst of sparkles on touch contact
            if (particlesRef.current && e.touches.length > 0) {
                for (let i = 0; i < 3; i++) {
                    particlesRef.current.addParticle(e.touches[0].clientX, e.touches[0].clientY);
                }
            }
        };
        // const handleTouchEnd = () => setIsVisible(false); // Optional: hide when lifting finger?

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                !!target.closest('a, button, [role="button"], [data-magnetic="true"]');

            setIsHovering(isInteractive);
            setIsVisible(true);
        };

        const handleMouseOut = () => setIsHovering(false);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        window.addEventListener('mouseout', handleMouseOut, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
            particlesRef.current?.destroy();
            soundRef.current?.destroy(); // Fix AudioContext leak
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* 1. Full Screen Canvas for Sparkles (Pointer Events None) */}
            <canvas
                ref={canvasRef}
                className="pointer-events-none fixed top-0 left-0 z-[9997] w-full h-full"
                style={{ pointerEvents: 'none' }}
            />

            {/* 2. Main Dot Cursor */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="bg-white rounded-full"
                    animate={{
                        width: isHovering ? 8 : 8,
                        height: isHovering ? 8 : 8,
                        scale: isHovering ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                />
            </motion.div>

            {/* 3. Outer Magnetic Ring */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="border border-white/40 rounded-full"
                    animate={{
                        width: isHovering ? 60 : 24,
                        height: isHovering ? 60 : 24,
                        opacity: isHovering ? 1 : 0.6,
                        backgroundColor: isHovering ? "rgba(255, 255, 255, 0.03)" : "transparent",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />
            </motion.div>
        </>
    );
}
