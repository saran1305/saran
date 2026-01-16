'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Line, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function CloudAssembler({ onComplete }: { onComplete?: () => void }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const linesRef = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    // Configuration
    const count = 40;
    const radius = 4;
    const connectionCount = 10;

    // Generate random start positions and fixed end positions (sphere)
    const { positions, targets, connections } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const tgt = new Float32Array(count * 3);
        const conns: THREE.Vector3[][] = [];

        const tempConns: THREE.Vector3[] = [];

        for (let i = 0; i < count; i++) {
            // Random start dispersion
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

            // Target sphere formation
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            tgt[i * 3] = x;
            tgt[i * 3 + 1] = y;
            tgt[i * 3 + 2] = z;

            if (i < connectionCount) {
                tempConns.push(new THREE.Vector3(x, y, z));
            }
        }

        // Create simplified connections between some nodes
        for (let i = 0; i < tempConns.length - 1; i++) {
            conns.push([tempConns[i], tempConns[i + 1]]);
        }
        // Close look for fun
        conns.push([tempConns[tempConns.length - 1], tempConns[0]]);

        return { positions: pos, targets: tgt, connections: conns };
    }, []);

    const dummy = new THREE.Object3D();

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;
        const assembleProgress = Math.min(time * 0.5, 1); // 2 seconds to assemble
        const ease = 1 - Math.pow(1 - assembleProgress, 3); // Cubic ease out

        // Trigger completion
        if (time > 2.5 && onComplete) {
            onComplete();
        }

        // Animate instances
        for (let i = 0; i < count; i++) {
            const startX = positions[i * 3];
            const startY = positions[i * 3 + 1];
            const startZ = positions[i * 3 + 2];

            const targetX = targets[i * 3];
            const targetY = targets[i * 3 + 1];
            const targetZ = targets[i * 3 + 2];

            // Lerp position
            dummy.position.set(
                startX + (targetX - startX) * ease,
                startY + (targetY - startY) * ease,
                startZ + (targetZ - startZ) * ease
            );

            // Add subtle breathing/float after assembly
            if (assembleProgress >= 1) {
                dummy.position.y += Math.sin(time + i) * 0.05;
            }

            // Look at center
            dummy.lookAt(0, 0, 0);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;

        // Rotate the whole cloud slowly
        meshRef.current.rotation.y = time * 0.1;

        // Animate light pulse
        if (lightRef.current) {
            lightRef.current.intensity = 2 + Math.sin(time * 4) * 1;
        }
    });

    return (
        <group>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                {/* Hexagon Shape */}
                <cylinderGeometry args={[0.5, 0.5, 0.2, 6]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#3b82f6"
                    emissiveIntensity={0.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </instancedMesh>

            {/* Connecting Data Pipelines */}
            <group ref={linesRef} rotation-y={Math.PI / 4}>
                {/*  Since lines are static relative to nodes, let's just rotate the group or animate separate packets.
                      For simplicity and effect: A faint wireframe sphere or just a few dynamic lines.
                  */}
            </group>

            {/* Central Glow */}
            <pointLight ref={lightRef} position={[0, 0, 0]} color="#3b82f6" distance={10} decay={2} />
        </group>
    );
}

export default function Loader({ onComplete }: { onComplete?: () => void }) {
    return (
        <section className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                    <color attach="background" args={['#000000']} />

                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 10]} intensity={1} />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <CloudAssembler onComplete={onComplete} />
                    </Float>

                    {/* Background Particles/Stars for Depth */}
                    {/* Simplified for performance, can add Sparkles from drei later if needed */}
                </Canvas>
            </div>

            <div className="z-10 text-center mt-64 pointer-events-none">
                <h2 className="text-2xl font-bold text-white tracking-[0.2em] animate-pulse">
                    INITIALIZING SYSTEM
                </h2>
                <div className="mt-4 flex gap-2 justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                </div>
                <p className="text-xs text-blue-400 mt-2 font-mono">
                    ORCHESTRATING CONTAINERS...
                </p>
            </div>
        </section>
    );
}
