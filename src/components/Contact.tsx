'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Send, MapPin, ArrowUpRight } from 'lucide-react';
import { useSound } from '@/context/SoundContext';

const contactLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/saran1305',
        icon: Github,
        username: '@saran1305',
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/saran1305',
        icon: Linkedin,
        username: '/in/saran1305',
    },
    {
        name: 'Email',
        href: 'mailto:shreecharan1305@gmail.com',
        icon: Mail,
        username: 'shreecharan1305@gmail.com',
    },
];

function ContactLink({
    link,
    index,
    isInView
}: {
    link: typeof contactLinks[0];
    index: number;
    isInView: boolean;
}) {
    const Icon = link.icon;
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
            gainNode.gain.value = 0.2;

            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    };

    return (
        <motion.a
            href={link.href}
            onClick={() => playClickSound()}
            target={link.name !== 'Email' ? '_blank' : undefined}
            rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className="group glass-card p-4 md:p-6 flex items-center gap-4 hover:border-accent-blue/30 transition-all duration-300"
            data-magnetic="true"
        >
            <div className="w-12 h-12 rounded-xl bg-glass-background flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                <Icon className="w-6 h-6 group-hover:text-accent-blue transition-colors" />
            </div>
            <div className="flex-1">
                <h4 className="font-semibold">{link.name}</h4>
                <p className="text-sm text-foreground-muted">{link.username}</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-foreground-muted group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </motion.a>
    );
}

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import { getAssetPath } from '@/utils/config';

function MiniGlobe({ isHovered, onHover, onLeave }: { isHovered: boolean, onHover: () => void, onLeave: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(getAssetPath('/textures/earth.png'));

    // Chennai Coordinates: 13.0827° N, 80.2707° E
    // Convert to rotation (Approximate adjustment for standard texture mapping)
    // Longitude 80E means we need to rotate Y by -80 degrees (plus offset to face camera)
    // Latitude 13N means we need to rotate X by 13 degrees
    const targetRotation = {
        x: (13.0827 * Math.PI) / 180,
        y: 4.5 // Turned by eye to face 80E towards camera (approx 4.5 rad offset)
    };

    useFrame((state, delta) => {
        if (meshRef.current) {
            if (!isHovered) {
                // Auto-rotate when not hovered
                meshRef.current.rotation.y += delta * 0.2;

                // Zoom out
                state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 6.5, delta * 2);
            } else {
                // Smoothly rotate to target location on hover
                // Damp rotation towards Chennai
                // We use a simple lerp for smoothness
                meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotation.x, delta * 2);

                // For Y, we need to handle the wrapping carefully, but for simple demo, lerp to closest mod 2PI is fine, or just lerp directly if close.
                // Resetting rotation to avoid "spinning back" long distances:
                const currentY = meshRef.current.rotation.y % (Math.PI * 2);
                meshRef.current.rotation.y = THREE.MathUtils.lerp(currentY, targetRotation.y, delta * 2);

                // Zoom in
                state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 4.5, delta * 2);
            }
        }
    });

    return (
        <group>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />

            <group ref={meshRef} onPointerEnter={onHover} onPointerLeave={onLeave}>
                <Sphere args={[2, 64, 64]}>
                    <meshStandardMaterial
                        map={texture}
                        roughness={0.6}
                        metalness={0.2}
                    />
                </Sphere>

                {/* Atmosphere Glow */}
                <Sphere args={[2.05, 64, 64]}>
                    <meshBasicMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.15}
                        side={THREE.BackSide}
                    />
                </Sphere>
            </group>

            <OrbitControls
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                autoRotate={false}
                minDistance={3.5}
                maxDistance={8}
            />
        </group>
    );
}

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Globe Hover State
    const [showLocation, setShowLocation] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
        const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
        window.location.href = `mailto:shreecharan1305@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-blue/5 rounded-full blur-3xl" />
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
                        Get In Touch
                    </span>
                    <h2 className="section-title mb-6">
                        Let&apos;s Build <span className="gradient-text">Together</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Have a project in mind or want to discuss opportunities?
                        I&apos;d love to hear from you.
                    </p>
                </motion.div>

                <div className="flex flex-col items-center gap-16">
                    {/* Interactive 3D Location card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="glass-card p-4 md:p-6 mb-8 relative overflow-hidden w-full max-w-2xl"
                    >
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-accent-blue" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Location</h4>
                                    <AnimatePresence>
                                        {showLocation && (
                                            <motion.p
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="text-accent-blue font-bold"
                                            >
                                                Chennai, India
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* 3D Globe Area - Only render when in view for performance */}
                        <div className="h-64 w-full relative -my-8 cursor-pointer">
                            {isInView && (
                                <Canvas
                                    camera={{ position: [0, 0, 7.5], fov: 45 }}
                                    dpr={[1, 2]} // Optimal pixel ratio
                                    gl={{ powerPreference: "high-performance" }}
                                >
                                    <MiniGlobe
                                        isHovered={showLocation}
                                        onHover={() => setShowLocation(true)}
                                        onLeave={() => setShowLocation(false)}
                                    />
                                </Canvas>
                            )}
                        </div>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        {contactLinks.map((link, index) => (
                            <ContactLink
                                key={link.name}
                                link={link}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </motion.div>
                </div>




                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-24 pt-8 border-t border-glass-border text-center"
                >
                    <p className="text-foreground-muted text-sm">
                        © {new Date().getFullYear()} Saran M. Crafted with passion & precision.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
