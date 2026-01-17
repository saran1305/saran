'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float, Text, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';

// --- Keyboard Sound Removed per user request ---

function TerminalWindow({ onComplete }: { onComplete?: () => void }) {
    const { viewport } = useThree();
    const isMobile = viewport.width < 5; // Approximate threshold

    // Responsive scaling
    const scale = isMobile ? viewport.width / 6.5 : 1; // Fit within width

    const [text, setText] = useState('> ');
    const fullText = `import React from 'react';\n\nconst Portfolio = () => {\n  return <DigitalTransformation />;\n};\n\nexport default Portfolio;`;

    // Use ref to prevent effect re-runs if onComplete changes
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        let currentText = '> ';
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < fullText.length) {
                currentText += fullText[currentIndex];
                setText(currentText);
                currentIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    if (onCompleteRef.current) onCompleteRef.current();
                }, 800); // Quick 0.8s delay after typing
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <group scale={scale}>
            {/* Glass Panel */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[6, 3]} />
                <meshPhysicalMaterial
                    color="#000"
                    transparent
                    opacity={0.8}
                    roughness={0.2}
                    metalness={0.8}
                    transmission={0.5}
                />
            </mesh>
            {/* Window Border */}
            <mesh position={[0, 0, -0.11]}>
                <planeGeometry args={[6.1, 3.1]} />
                <meshBasicMaterial color="#333" />
            </mesh>

            <Text
                position={[-2.8, 1.2, 0.1]}
                fontSize={0.2}
                color="#4ade80" // Green
                anchorX="left"
                anchorY="top"
            // font prop removed to use default fallback and avoid suspense blocking
            >
                {text + '_'}
            </Text>
        </group>
    );
}

export default function LoaderTerminal({ onComplete }: { onComplete?: () => void }) {
    // Safety timeout to force completion if animation hangs
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 15000); // 15s max (enough for typing + delay)
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="relative w-full h-full bg-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <color attach="background" args={['#050505']} />

                <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                    <TerminalWindow onComplete={onComplete} />
                </Float>

                {/* Background Grid */}
                <gridHelper args={[20, 20]} position={[0, -2, -5]} rotation={[0.5, 0, 0]} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} intensity={1.5} />
                </EffectComposer>
            </Canvas>

            <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 pointer-events-auto">
                <div className="text-center text-green-500 font-mono text-xs opacity-50">
                    TERMINAL ACCESS GRANTED
                </div>
                {/* Manual Override Button */}
                <button
                    onClick={onComplete}
                    className="px-6 py-2 border border-green-500/30 text-green-500 font-mono text-xs hover:bg-green-500/10 transition-colors uppercase tracking-widest z-50 cursor-pointer"
                >
                    [ ENTER SYSTEM ]
                </button>
            </div>
        </div>
    );
}
