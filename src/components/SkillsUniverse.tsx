'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const skills = [
    { name: "React", color: "#61dafb", distance: 3, speed: 1 },
    { name: "AWS", color: "#ff9900", distance: 4.5, speed: 0.8 },
    { name: "Node", color: "#68a063", distance: 6, speed: 0.6 },
    { name: "Docker", color: "#2496ed", distance: 2.2, speed: 1.2 },
    { name: "NextJS", color: "#ffffff", distance: 5, speed: 0.5 },
    { name: "TS", color: "#3178c6", distance: 3.8, speed: 0.9 },
];

function Planet({ skill }: { skill: any }) {
    const meshRef = useRef<THREE.Group>(null);
    const angleRef = useRef(Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        angleRef.current += delta * skill.speed * 0.5;
        const x = Math.cos(angleRef.current) * skill.distance;
        const z = Math.sin(angleRef.current) * skill.distance;
        meshRef.current.position.set(x, 0, z);
        meshRef.current.rotation.y += delta;
    });

    return (
        <group ref={meshRef}>
            <Trail width={1} length={6} color={skill.color} attenuation={(t) => t * t}>
                <mesh>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={2} />
                </mesh>
            </Trail>
            <Text
                position={[0, 0.5, 0]}
                fontSize={0.3}
                color={skill.color}
                anchorX="center"
                anchorY="bottom"
            >
                {skill.name}
            </Text>
        </group>
    );
}

function Sun() {
    return (
        <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} />
            <pointLight intensity={2} distance={20} decay={2} color="white" />
        </mesh>
    );
}

export default function SkillsUniverse() {
    return (
        <div className="relative min-h-[600px] w-full bg-black rounded-3xl overflow-hidden border border-white/10">
            <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.2} />
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />

                <Sun />
                {skills.map((s, i) => <Planet key={i} skill={s} />)}

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                <EffectComposer>
                    <Bloom luminanceThreshold={1} intensity={1.5} radius={0.5} />
                </EffectComposer>
            </Canvas>
            <div className="absolute bottom-4 left-4 font-mono text-xs text-white/50">
                INTERACTIVE SYSTEM MAP
            </div>
        </div>
    );
}
