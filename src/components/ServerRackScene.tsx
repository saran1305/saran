'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Stars, Sparkles, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

function ServerUnit() {
    return (
        <group>
            {/* Main Rack Chassis */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 4, 2]} />
                <meshStandardMaterial color="#0b1120" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Glowing Edges/Frame */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.05, 4.05, 2.05]} />
                <meshBasicMaterial color="#0ea5e9" wireframe={true} />
            </mesh>

            {/* Server Blades / Status Lights */}
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh key={i} position={[0, -1.5 + i * 0.45, 1.01]}>
                    <planeGeometry args={[1.6, 0.2]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? "#0ea5e9" : "#3b82f6"}
                        emissive={i % 2 === 0 ? "#0ea5e9" : "#3b82f6"}
                        emissiveIntensity={2}
                    />
                </mesh>
            ))}

            {/* Side Vents */}
            <mesh position={[1.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[1.5, 3.5]} />
                <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
            </mesh>
        </group>
    );
}

function DataStream() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Inner Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
            </mesh>
            {/* Outer Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[4.5, 0.01, 16, 100]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
            </mesh>

            <Sparkles
                count={200}
                scale={8}
                size={2}
                speed={0.4}
                opacity={0.5}
                color="#22d3ee"
            />
        </group>
    )
}

function Scene() {
    const cameraRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (cameraRef.current) {
            // Subtle camera sway
            cameraRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
            cameraRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <group ref={cameraRef}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <ServerUnit />
            </Float>
            <DataStream />

            {/* Cyberpunk Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 2, 5]} color="#0ea5e9" intensity={3} distance={10} />
            <pointLight position={[-5, -2, -5]} color="#d946ef" intensity={2} distance={10} />
            <spotLight position={[0, 10, 0]} color="#ffffff" intensity={1} angle={0.5} penumbra={1} />
        </group>
    );
}

export default function ServerRackScene() {
    return (
        <div className="w-full h-full">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 5, 20]} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Scene />
            </Canvas>
        </div>
    );
}
