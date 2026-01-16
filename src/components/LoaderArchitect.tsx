'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Box, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Building({ position, delay, scaleTarget }: { position: [number, number, number], delay: number, scaleTarget: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;

        // Appear/Grow logic
        if (time > delay) {
            const growTime = time - delay;
            const growProgress = Math.min(growTime * 2, 1);
            const ease = 1 - Math.pow(1 - growProgress, 3);

            meshRef.current.scale.set(
                scaleTarget[0] * ease,
                scaleTarget[1] * ease,
                scaleTarget[2] * ease
            );
        } else {
            meshRef.current.scale.set(0, 0, 0);
        }
    });

    return (
        <Box ref={meshRef} position={position} args={[1, 1, 1]}>
            <meshPhysicalMaterial
                color="#ffffff"
                transmission={0.9} // Glass
                thickness={1}
                roughness={0.1}
                metalness={0.1}
                ior={1.5}
            />
            {/* Inner wireframe style glow */}
            <meshBasicMaterial wireframe color="#bfdbfe" transparent opacity={0.1} attach="material-1" />
        </Box>
    );
}

function DigitalCity({ onComplete }: { onComplete?: () => void }) {
    // Generate city grid layout
    const buildings = useMemo(() => {
        const items = [];
        const size = 5;
        for (let x = -size; x <= size; x++) {
            for (let z = -size; z <= size; z++) {
                // Random height and delay based on distance from center
                const dist = Math.sqrt(x * x + z * z);
                const height = Math.random() * 3 + 0.5 + (5 - dist) * 0.5;
                const delay = dist * 0.1 + Math.random() * 0.5;

                if (Math.random() > 0.3) { // 70% chance to exist
                    items.push({
                        id: `${x}-${z}`,
                        position: [x * 1.2, height / 2, z * 1.2] as [number, number, number],
                        scale: [1, height, 1] as [number, number, number],
                        delay
                    });
                }
            }
        }
        return items;
    }, []);

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        // Rotate the whole city
        state.camera.position.x = Math.sin(time * 0.2) * 15;
        state.camera.position.z = Math.cos(time * 0.2) * 15;
        state.camera.lookAt(0, 0, 0);

        if (time > 3.0 && onComplete) {
            onComplete();
        }
    });

    return (
        <group>
            {buildings.map((b) => (
                <Building
                    key={b.id}
                    position={b.position}
                    delay={b.delay}
                    scaleTarget={b.scale}
                />
            ))}
            {/* Base Grid */}
            <gridHelper args={[20, 20, 0x3b82f6, 0x1e3a8a]} position={[0, 0, 0]} />

            {/* Connecting Lines/Data Streams */}
            {/* (Simplified to moving lights or just the grid for now to keep performance high) */}
        </group>
    );
}

export default function LoaderArchitect({ onComplete }: { onComplete?: () => void }) {
    return (
        <section className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={45} />
                    <color attach="background" args={['#000000']} />

                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
                    <pointLight position={[-10, 5, -10]} intensity={1} color="#3b82f6" />

                    <DigitalCity onComplete={onComplete} />

                    <Environment preset="night" />
                    <Float speed={1} rotationIntensity={0} floatIntensity={0.2} />
                </Canvas>
            </div>

            <div className="z-10 text-center mt-64 pointer-events-none mix-blend-difference">
                <h2 className="text-3xl font-light text-white tracking-[0.3em] uppercase">
                    Architecting
                </h2>
                <div className="mt-2 text-xs font-mono text-blue-300/80 tracking-widest">
                    TRANSFORMING DIGITAL LANDSCAPE...
                </div>
            </div>
        </section>
    );
}
