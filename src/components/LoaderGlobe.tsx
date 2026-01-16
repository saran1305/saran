'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Sphere, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Globe({ onComplete }: { onComplete?: () => void }) {
    const globeRef = useRef<THREE.Group>(null);
    const pointsRef = useRef<THREE.Points>(null);

    // Generate random points on sphere surface for "cities"
    const particles = useMemo(() => {
        const count = 1500;
        const positions = new Float32Array(count * 3);
        const radius = 2.5;

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
            positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (!globeRef.current) return;
        const time = state.clock.elapsedTime;

        // Rotate globe
        globeRef.current.rotation.y = time * 0.15;

        // Pulse effect on points
        if (pointsRef.current && pointsRef.current.material instanceof THREE.Material) {
            // pointsRef.current.material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
        }

        if (time > 3.0 && onComplete) {
            onComplete();
        }
    });

    return (
        <group ref={globeRef}>
            {/* Base Wireframe Sphere */}
            <mesh>
                <sphereGeometry args={[2.5, 24, 24]} />
                <meshBasicMaterial
                    color="#1e40af"
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Glowing Points (Cities/Nodes) */}
            <Points positions={particles} stride={3} ref={pointsRef}>
                <PointMaterial
                    transparent
                    color="#60a5fa"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>

            {/* Orbiting Satellite Rings */}
            <mesh rotation-x={Math.PI / 2} rotation-y={Math.PI / 6}>
                <torusGeometry args={[3.2, 0.02, 16, 100]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
            </mesh>
            <mesh rotation-x={Math.PI / 3} rotation-y={-Math.PI / 6}>
                <torusGeometry args={[3.8, 0.02, 16, 100]} />
                <meshBasicMaterial color="#93c5fd" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

export default function LoaderGlobe({ onComplete }: { onComplete?: () => void }) {
    return (
        <section className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                    <color attach="background" args={['#020617']} />

                    <ambientLight intensity={0.5} />
                    {/* Cinematic blue/cyan lighting */}
                    <pointLight position={[10, 5, 10]} intensity={2} color="#3b82f6" />
                    <pointLight position={[-10, -5, -10]} intensity={2} color="#2dd4bf" />

                    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
                        <Globe onComplete={onComplete} />
                    </Float>

                    {/* Background Stars */}
                    <Points positions={new Float32Array(600).map(() => (Math.random() - 0.5) * 20)}>
                        <PointMaterial color="#ffffff" size={0.02} sizeAttenuation={true} transparent opacity={0.4} />
                    </Points>
                </Canvas>
            </div>

            <div className="z-10 text-center mt-72 pointer-events-none">
                <h2 className="text-xl font-medium text-blue-100 tracking-[0.4em] uppercase glow-text">
                    Global Connectivity
                </h2>
                <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
                    <p className="text-[10px] font-mono text-blue-400/80 tracking-widest">
                        ESTABLISHING SECURE UPLINK...
                    </p>
                </div>
            </div>
        </section>
    );
}
