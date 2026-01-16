'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Cloud, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

function Padlock() {
    return (
        <group position={[0, -0.5, 2]}>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 0.8, 0.4]} />
                <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} /> {/* Gold */}
            </mesh>
            {/* Shackle */}
            <mesh position={[0, 0.6, 0]}>
                <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI]} />
                <meshStandardMaterial color="#d1d5db" metalness={1} roughness={0.2} /> {/* Silver */}
            </mesh>
            {/* Keyhole */}
            <mesh position={[0, 0, 0.21]}>
                <circleGeometry args={[0.1, 16]} />
                <meshBasicMaterial color="#000" />
            </mesh>
        </group>
    )
}

function CloudFortress() {
    return (
        <group>
            {/* The Cloud */}
            <Cloud
                opacity={0.8}
                speed={0.4}
                bounds={[10, 2, 1.5]}
                segments={20}
                position={[0, 0, 0]}
                color="#ffffff"
            />
            {/* Floating Lock Symbol */}
            <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
                <Padlock />
            </Float>
        </group>
    );
}

export default function LoaderCloud({ onComplete }: { onComplete?: () => void }) {
    const [status, setStatus] = React.useState('ESTABLISHING SECURE CONNECTION...');

    React.useEffect(() => {
        // Simulate security checks
        const timer1 = setTimeout(() => setStatus('VERIFYING ENCRYPTION KEYS...'), 1500);
        const timer2 = setTimeout(() => setStatus('ACCESS GRANTED'), 3000);
        const timer3 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 3800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <div className="relative w-full h-full bg-sky-900">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <color attach="background" args={['#0f172a']} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#fbbf24" />
                <pointLight position={[-10, -10, 10]} intensity={1} color="#38bdf8" />

                <CloudFortress />

            </Canvas>
            <div className="absolute bottom-10 left-0 right-0 text-center text-sky-200 font-sans tracking-widest text-sm uppercase animate-pulse">
                {status}
            </div>
        </div>
    );
}
