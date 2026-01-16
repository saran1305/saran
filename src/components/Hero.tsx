'use client';

import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// Realistic Macbook-style Laptop
function Laptop({ scrollProgress, isDark }: { scrollProgress: number; isDark: boolean }) {
    const laptopRef = useRef<THREE.Group>(null);
    const screenRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (laptopRef.current) {
            // Floating animation
            laptopRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 - 0.6; // Lowered to -0.6 to prevent top clipping

            // Scroll rotation - Smooth cinematic rotation
            // x: Starts tilted up, levels out
            laptopRef.current.rotation.x = 0.1 + scrollProgress * 0.1;
            // y: Full smooth rotation from side (-0.5) to side (2.5) for cinematic effect
            laptopRef.current.rotation.y = -0.5 + scrollProgress * 3.0;
        }
    });

    // Webcam Logic
    const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);

    useEffect(() => {
        let video: HTMLVideoElement | null = null;
        let stream: MediaStream | null = null;

        const startWebcam = async () => {
            try {
                if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: {
                            width: 1280,
                            height: 720,
                            facingMode: 'user'
                        },
                        audio: false
                    });

                    video = document.createElement('video');
                    video.srcObject = stream;
                    video.playsInline = true;
                    video.muted = true; // Important for autoplay
                    video.play();

                    const texture = new THREE.VideoTexture(video);
                    texture.colorSpace = THREE.SRGBColorSpace;
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;

                    // Fix mirrored webcam perception if needed, but usually screens act like mirrors?
                    // Let's typically flip texture for a mirror effect on the X axis if desired, but default is usually fine.
                    // For a true "Mirror", we might want to scale x by -1. Let's see...
                    // texture.center.set(0.5, 0.5);
                    // texture.repeat.set(-1, 1);

                    setVideoTexture(texture);
                }
            } catch (err) {
                console.warn("Webcam access denied or failed:", err);
            }
        };

        startWebcam();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (video) {
                video.srcObject = null;
                video.load();
            }
        };
    }, []);

    // Material colors based on theme compatibility (Silver/Space Grey)
    const bodyColor = isDark ? "#2b2b2b" : "#e0e0e0";
    const keyColor = "#1a1a1a";

    return (
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
            <group ref={laptopRef} scale={1.45} rotation={[0.1, 0, 0]}>
                {/* Base Body - Aluminum finish */}
                <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.4, 0.08, 1.6]} />
                    <meshStandardMaterial
                        color={bodyColor}
                        metalness={0.8}
                        roughness={0.2}
                        envMapIntensity={1}
                    />
                </mesh>

                {/* Keyboard Area - Recessed */}
                <mesh position={[0, 0.01, 0.1]}>
                    <boxGeometry args={[2.2, 0.01, 1.2]} />
                    <meshStandardMaterial color={isDark ? "#1f1f1f" : "#d4d4d4"} metalness={0.5} roughness={0.4} />
                </mesh>

                {/* Keys - Realistic Grid */}
                {[...Array(6)].map((_, row) => (
                    [...Array(14)].map((_, col) => {
                        // Skip gaps for realism (simplified layout)
                        return (
                            <mesh key={`${row}-${col}`} position={[-1.0 + col * 0.155, 0.02, -0.35 + row * 0.17]}>
                                <boxGeometry args={[0.13, 0.02, 0.13]} />
                                <meshStandardMaterial color={keyColor} metalness={0.3} roughness={0.6} />
                            </mesh>
                        );
                    })
                ))}

                {/* Trackpad - Glass feel */}
                <mesh position={[0, 0.02, 0.55]}>
                    <boxGeometry args={[0.9, 0.01, 0.55]} />
                    <meshStandardMaterial
                        color={bodyColor}
                        metalness={0.4}
                        roughness={0.3}
                    />
                </mesh>

                {/* Screen Hinge */}
                <mesh position={[0, 0.05, -0.8]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.05, 2, 32]} />
                    <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Screen Assembly */}
                <group position={[0, 0.05, -0.8]} rotation={[-0.3, 0, 0]}>
                    {/* Lid Back */}
                    <mesh position={[0, 0.6, -0.02]}>
                        <boxGeometry args={[2.4, 1.4, 0.04]} />
                        <meshStandardMaterial
                            color={bodyColor}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* Bezel */}
                    <mesh position={[0, 0.6, 0.01]}>
                        <boxGeometry args={[2.35, 1.35, 0.01]} />
                        <meshStandardMaterial color="#050505" metalness={0.1} roughness={0.8} />
                    </mesh>

                    {/* Display - Webcam Feed or Fallback */}
                    <mesh ref={screenRef} position={[0, 0.6, 0.016]}>
                        <planeGeometry args={[2.25, 1.25]} />
                        {videoTexture ? (
                            <meshBasicMaterial
                                map={videoTexture}
                                toneMapped={false} // Keep colors vivid
                            />
                        ) : (
                            <meshPhysicalMaterial
                                color="#000000"
                                metalness={0.2}
                                roughness={0.2}
                                clearcoat={1}
                                clearcoatRoughness={0.1}
                                emissive="#000000"
                            />
                        )}
                    </mesh>

                    {/* Subtle Reflection/Glare Mesh (Reduced when video is on) */}
                    <mesh position={[0, 0.6, 0.017]} rotation={[0, 0, 0]}>
                        <planeGeometry args={[2.25, 1.25]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            transparent
                            opacity={videoTexture ? 0.01 : 0.02}
                        />
                    </mesh>
                </group>
            </group>
        </Float>
    );
}

// Scene Setup
function Scene({ scrollProgress }: { scrollProgress: number }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <>
            <perspectiveCamera position={[0, 0.2, 9]} />
            <ambientLight intensity={isDark ? 0.4 : 0.8} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={isDark ? 1.5 : 2}
                castShadow
                shadow-bias={-0.0001}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={isDark ? "#4a9eff" : "#ffffff"} />

            <Laptop scrollProgress={scrollProgress} isDark={isDark} />

            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            <Environment preset={isDark ? "city" : "studio"} blur={0.8} />
        </>
    );
}

import { useSound } from '@/context/SoundContext';

// ... (existing imports)

// Main Component
export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "0px 0px -100px 0px" }); // Keep it alive a bit longer for smooth exit
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const { isSoundEnabled } = useSound();

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        return scrollYProgress.on('change', (latest) => {
            setScrollProgress(latest);
        });
    }, [scrollYProgress]);

    const playClickSound = () => {
        if (isSoundEnabled) {
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.2; // Increased from 0.1

            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh] flex flex-col items-center"
        >
            {/* TEXT CONTENT - Fixed at top, independent of 3D */}
            <div className="relative z-10 w-full pt-32 pb-10 text-center px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs md:text-sm text-foreground-muted mb-4 tracking-[0.3em] uppercase"
                >
                    Saran M • Digital Transformation Specialist
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
                >
                    I build{' '}
                    <span className="gradient-text-glow">scalable interfaces</span>
                    <br className="hidden md:block" />
                    {' '}&{' '}
                    <span className="gradient-text-glow">resilient cloud systems</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#projects"
                        onClick={() => playClickSound()}
                        className="px-8 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                    >
                        View My Work
                    </a>
                    <a
                        href="#contact"
                        onClick={() => playClickSound()}
                        className="px-8 py-3 rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </div>

            {/* 3D CANVAS - Sticky background - Only render when in view */}
            <div className="sticky top-0 w-full h-screen -z-10">
                {isInView && (
                    <Canvas
                        camera={{ position: [0, 0.2, 9], fov: 30 }}
                        dpr={[1, 2]}
                        shadows
                        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                    >
                        <Suspense fallback={null}>
                            <Scene scrollProgress={scrollProgress} />
                        </Suspense>
                    </Canvas>
                )}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground-muted text-xs tracking-widest">
                SCROLL
            </div>
        </section>
    );
}
