'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, RoundedBox, Html, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const stackLayers = [
    {
        name: "FRONTEND LAYER",
        color: "#60a5fa", // Blue
        y: 1.5,
        skills: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js"]
    },
    {
        name: "BACKEND LAYER",
        color: "#4ade80", // Green
        y: 0,
        skills: ["Node.js", "Python", "GraphQL", "PostgreSQL", "Redis"]
    },
    {
        name: "INFRASTRUCTURE",
        color: "#f472b6", // Pink/Purple
        y: -1.5,
        skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"]
    }
];

function SkillBlock({ text, position, color }: { text: string, position: [number, number, number], color: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    scale={hovered ? 1.1 : 1}
                >
                    <boxGeometry args={[1.5, 0.4, 0.4]} />
                    <meshStandardMaterial
                        color={hovered ? "#ffffff" : color}
                        emissive={color}
                        emissiveIntensity={hovered ? 2 : 0.5}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>
                <Text
                    position={[0, 0, 0.21]}
                    fontSize={0.15}
                    color="#000000"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    {text}
                </Text>
            </Float>
        </group>
    )
}

function StackLayer({ layer }: { layer: typeof stackLayers[0] }) {
    return (
        <group position={[0, layer.y, 0]}>
            {/* Base Platform */}
            <mesh receiveShadow rotation-x={-Math.PI / 2}>
                <cylinderGeometry args={[3.5, 3.5, 0.1, 64]} />
                <meshPhysicalMaterial
                    color={layer.color}
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                    transmission={0.5}
                    thickness={0.5}
                />
            </mesh>

            {/* Glowing Ring */}
            <mesh rotation-x={-Math.PI / 2}>
                <torusGeometry args={[3.5, 0.02, 16, 64]} />
                <meshBasicMaterial color={layer.color} toneMapped={false} />
            </mesh>

            {/* Label */}
            <Text
                position={[0, 0.5, 2.5]}
                fontSize={0.3}
                color={layer.color}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0pnF8R-0.woff2"
            >
                {layer.name}
            </Text>

            {/* Skills arranged in a circle/semicircle */}
            {layer.skills.map((skill, i) => {
                const angle = (i / layer.skills.length) * Math.PI * 2; // Full circle
                const radius = 2.2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <SkillBlock
                        key={skill}
                        text={skill}
                        position={[x, 0.3, z]}
                        color={layer.color}
                    />
                );
            })}

            {/* Connecting Pillars visualization (Central Core) */}
            <mesh position={[0, -0.75, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
                <meshBasicMaterial color="#333" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

export default function SkillsStack() {
    return (
        <div className="relative w-full h-[800px] bg-black rounded-3xl overflow-hidden border border-white/10">
            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-2xl font-bold text-white tracking-widest uppercase">
                    Full Stack <span className="text-blue-500">Architecture</span>
                </h3>
                <p className="text-gray-400 text-sm mt-1">Interactive Infrastructure Visualization</p>
            </div>

            <Canvas shadows camera={{ position: [5, 4, 8], fov: 45 }}>
                <color attach="background" args={['#030712']} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, 0, -5]} intensity={1} color="#4ade80" />

                <PresentationControls
                    global
                    zoom={0.8}
                    rotation={[0, -Math.PI / 4, 0]}
                    polar={[-Math.PI / 6, Math.PI / 6]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                    <group position={[0, 0, 0]}>
                        {stackLayers.map((layer, i) => (
                            <StackLayer key={layer.name} layer={layer} />
                        ))}
                    </group>
                </PresentationControls>

                <EffectComposer>
                    <Bloom luminanceThreshold={0.5} intensity={1.5} radius={0.8} />
                </EffectComposer>
            </Canvas>

            <div className="absolute bottom-6 w-full text-center text-white/20 text-xs font-mono">
                DRAG TO ROTATE • HOVER TO INSPECT
            </div>
        </div>
    );
}
