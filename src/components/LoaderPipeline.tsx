'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

function PipelineItem({ position, offset }: { position: [number, number, number], offset: number }) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Move along Z axis
        const speed = 4;
        const limit = 10;
        const z = (state.clock.elapsedTime * speed + offset) % (limit * 2) - limit;

        meshRef.current.position.z = z;
        meshRef.current.position.y = Math.sin(z * 0.5) * 0.2; // Slight bounce

        // Scale effect when passing through "scanner" at z=0
        const dist = Math.abs(z);
        const scale = dist < 1 ? 1 + (1 - dist) * 0.5 : 1;
        meshRef.current.scale.setScalar(scale);
    });

    return (
        <group ref={meshRef} position={position}>
            {/* The "Code Block" Package */}
            <mesh>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial
                    color="#000000"
                    emissive="#00ffff"
                    emissiveIntensity={0.8}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={false}
                />
            </mesh>
            {/* Wireframe Overlay */}
            <mesh>
                <boxGeometry args={[0.82, 0.82, 0.82]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

function ScannerGate() {
    return (
        <group position={[0, 0, 0]}>
            {/* Scanner Ring */}
            <mesh rotation-z={Math.PI / 4}>
                <torusGeometry args={[1.5, 0.1, 16, 4]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
            </mesh>
            {/* Laser Beam */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[2.5, 2.5]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

function InfinitePipeline({ onComplete }: { onComplete?: () => void }) {
    // Pipeline track
    const items = useMemo(() => {
        return Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            offset: i * 2.5
        }));
    }, []);

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if (time > 3.0 && onComplete) {
            onComplete();
        }
    });

    return (
        <group rotation={[0.2, -0.5, 0]}>
            {/* The Conveyor Stream */}
            {items.map((item) => (
                <PipelineItem key={item.id} position={[0, 0, 0]} offset={item.offset} />
            ))}

            {/* The Scanner */}
            <ScannerGate />

            {/* Floor Reflection Grid */}
            <gridHelper args={[20, 20, 0x111111, 0x050505]} position={[0, -2, 0]} />
        </group>
    );
}

export default function LoaderPipeline({ onComplete }: { onComplete?: () => void }) {
    return (
        <section className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
                    <color attach="background" args={['#050505']} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />

                    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                        <InfinitePipeline onComplete={onComplete} />
                    </Float>

                    <Environment preset="city" />
                </Canvas>
            </div>

            <div className="z-10 text-center mt-64 pointer-events-none">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-[0.2em] animate-pulse">
                    CI/CD PIPELINE
                </h2>
                <div className="mt-2 text-xs font-mono text-cyan-500/70">
                    <div>BUILDING... TESTING... DEPLOYING...</div>
                    <div className="w-32 h-1 bg-gray-800 rounded-full mx-auto mt-2 overflow-hidden">
                        <div className="h-full bg-cyan-500 w-full animate-[loading_2s_ease-in-out_infinite] origin-left" />
                    </div>
                </div>
            </div>
        </section>
    );
}
