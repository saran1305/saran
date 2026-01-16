'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Constellation() {
    const points = useMemo(() => [
        new THREE.Vector3(-2, 1, 0),
        new THREE.Vector3(2, 1.5, -1),
        new THREE.Vector3(0, -1, 1),
        new THREE.Vector3(-1.5, -1.5, -1),
        new THREE.Vector3(1.5, -0.5, 0),
    ], []);

    const lines = useMemo(() => [
        [points[0], points[1]],
        [points[1], points[2]],
        [points[2], points[3]],
        [points[2], points[4]],
        [points[0], points[3]],
    ], [points]);

    return (
        <group>
            {/* Stars/Nodes */}
            {points.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color="#60a5fa" />
                </mesh>
            ))}

            {/* Connections */}
            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line}
                    color="#rgba(96, 165, 250, 0.3)"
                    lineWidth={1}
                    transparent
                    opacity={0.3}
                />
            ))}
        </group>
    );
}

export default function LoaderConstellation({ onComplete }: { onComplete?: () => void }) {
    const [status, setStatus] = useState('MAPPING DIGITAL UNIVERSE...');

    useEffect(() => {
        const timer1 = setTimeout(() => setStatus('CONNECTING NODES...'), 1500);
        const timer2 = setTimeout(() => setStatus('SYSTEM INITIALIZED'), 3000);
        const timer3 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <div className="relative w-full h-full bg-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
                <color attach="background" args={['#020617']} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                    <Constellation />
                </Float>

                <EffectComposer>
                    <Bloom luminanceThreshold={0} intensity={1.0} radius={0.5} />
                </EffectComposer>
            </Canvas>
            <div className="absolute bottom-10 left-0 right-0 text-center text-blue-200 font-light tracking-[0.3em] text-xs uppercase animate-pulse">
                {status}
            </div>
        </div>
    );
}
