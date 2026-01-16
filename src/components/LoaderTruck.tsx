'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Box, Cylinder, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function ToolPackage({ position, color, textureUrl }: { position: [number, number, number], color: string, textureUrl?: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [spawned] = useState(() => Math.random() * 0.5); // Random spin start

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += 0.05;
        meshRef.current.rotation.y += 0.05;
        meshRef.current.position.y -= 0.05; // Fall down
        meshRef.current.position.x -= 0.1; // Move left relative to truck (or stay behind)

        // Scale down as they fall/fade
        if (meshRef.current.position.y < -3) {
            meshRef.current.scale.multiplyScalar(0.9);
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
        </mesh>
    );
}

function CartoonTruck() {
    const truckRef = useRef<THREE.Group>(null);
    const [tools, setTools] = useState<{ id: number, pos: [number, number, number], color: string }[]>([]);

    useFrame((state) => {
        if (!truckRef.current) return;
        const time = state.clock.elapsedTime;

        // Bounce effect
        truckRef.current.position.y = Math.sin(time * 15) * 0.05;

        // Spawn tools occasionally
        if (Math.random() < 0.05) {
            setTools(prev => [
                ...prev,
                {
                    id: Date.now(),
                    pos: [truckRef.current!.position.x - 2, 0, 0], // Spawn behind
                    color: ['#06b6d4', '#a855f7', '#3b82f6'][Math.floor(Math.random() * 3)]
                }
            ].slice(-10)); // Keep last 10
        }
    });

    return (
        <group ref={truckRef}>
            {/* Chassis */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[4, 0.5, 2]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Cab */}
            <mesh position={[1.2, 1.5, 0]}>
                <boxGeometry args={[1.5, 1.5, 2]} />
                <meshStandardMaterial color="#ef4444" /> {/* Red Cab */}
            </mesh>
            {/* Windshield */}
            <mesh position={[1.2, 1.8, 0]}>
                <boxGeometry args={[1.55, 0.8, 2.05]} />
                <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} />
            </mesh>

            {/* Container/Box */}
            <mesh position={[-1, 1.5, 0]}>
                <boxGeometry args={[2.5, 2, 2.1]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Logo on side */}
            <Text position={[-1, 1.5, 1.1]} fontSize={0.8} color="#000" anchorX="center" anchorY="middle">
                DevOps
            </Text>

            {/* Wheels */}
            {[[-1.2, 0], [1.2, 0], [-1.2, -1], [1.2, -1]].map((pos, i) => (
                <group key={i}>
                    <mesh position={[pos[0], 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.4, 0.4, 0.5, 16]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                    <mesh position={[pos[0], 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.4, 0.4, 0.5, 16]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                </group>
            ))}

            {/* Dropped Tools */}
            {tools.map(t => (
                <ToolPackage key={t.id} position={t.pos} color={t.color} />
            ))}
        </group>
    );
}


export default function LoaderTruck({ onComplete }: { onComplete?: () => void }) {
    // Animate truck across screen
    // Camera follows? Or static?

    // Let's make a wrapper that moves the truck
    const containerRef = useRef<THREE.Group>(null);

    // To handle animation completion
    const [finished, setFinished] = useState(false);

    return (
        <section className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-sky-300 to-sky-100">
                <Canvas shadows>
                    <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

                    <PhysicsTruckWrapper onComplete={onComplete} />

                    {/* Ground */}
                    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[100, 20]} />
                        <meshStandardMaterial color="#86efac" />
                    </mesh>
                    {/* Road */}
                    <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[100, 4]} />
                        <meshStandardMaterial color="#555" />
                    </mesh>

                </Canvas>
            </div>
            <div className="z-10 text-center mt-80 pointer-events-none">
                <h2 className="text-3xl font-bold text-slate-800 tracking-wider">
                    DELIVERING UPDATES...
                </h2>
            </div>
        </section>
    );
}

function PhysicsTruckWrapper({ onComplete }: { onComplete?: () => void }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;

        // Move from left (-15) to right (15)
        const x = -15 + (time * 6) % 30; // Loop for now, or just once

        groupRef.current.position.x = x;

        if (time > 4.5 && onComplete) {
            onComplete();
        }
    });

    return (
        <group ref={groupRef}>
            <CartoonTruck />
        </group>
    )
}
