'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Line, Circle } from '@react-three/drei';
import * as THREE from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

function NeonWheel({ onComplete }: { onComplete?: () => void }) {
    const wheelRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!wheelRef.current) return;
        const time = state.clock.elapsedTime;

        // Spin the wheel
        wheelRef.current.rotation.z = -time * 1.5; // Counter-clockwise spin

        if (time > 3.0 && onComplete) {
            onComplete();
        }
    });

    // Procedural K8s Wheel Geometry
    // Outer ring, inner ring, 7 spokes
    const spokes = Array.from({ length: 7 }).map((_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        return (
            <group key={i} rotation={[0, 0, angle]}>
                {/* Spoke Shaft */}
                <mesh position={[0, 1.8, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 1.6, 8]} />
                    <meshBasicMaterial color="#a855f7" /> {/* Purple core */}
                </mesh>
                {/* Spoke Handle/Knob */}
                <mesh position={[0, 2.7, 0]}>
                    <capsuleGeometry args={[0.2, 0.6, 4, 8]} />
                    <meshBasicMaterial color="#06b6d4" /> {/* Cyan tip */}
                </mesh>
            </group>
        );
    });

    return (
        <group ref={wheelRef}>
            {/* Outer Ring */}
            <mesh rotation-x={Math.PI / 2}>
                <torusGeometry args={[2.2, 0.15, 16, 64]} />
                <meshBasicMaterial color="#06b6d4" toneMapped={false} />
            </mesh>

            {/* Inner Hub Ring */}
            <mesh rotation-x={Math.PI / 2}>
                <torusGeometry args={[0.8, 0.15, 16, 32]} />
                <meshBasicMaterial color="#a855f7" toneMapped={false} />
            </mesh>

            {/* Central Hub */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                <meshBasicMaterial color="#06b6d4" toneMapped={false} />
            </mesh>

            {/* Spokes */}
            {spokes}
        </group>
    );
}

function RetroGrid() {
    return (
        <group position={[0, -4, -10]} rotation={[-Math.PI / 2.5, 0, 0]}>
            <gridHelper args={[40, 40, 0xff00ff, 0x1e1b4b]} />
        </group>
    );
}

export default function LoaderKubernetes({ onComplete }: { onComplete?: () => void }) {
    return (
        <section className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas gl={{ antialias: false }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                    <color attach="background" args={['#030014']} /> {/* Deep purple/black void */}

                    <ambientLight intensity={0.5} />

                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <NeonWheel onComplete={onComplete} />
                    </Float>

                    <RetroGrid />

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={2.0} />
                    </EffectComposer>
                </Canvas>
            </div>

            <div className="z-10 text-center mt-80 pointer-events-none">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 tracking-[0.2em] uppercase animate-pulse drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    KUBERNETES
                </h2>
                <div className="mt-3 flex items-center justify-center gap-3">
                    <span className="text-cyan-400 font-mono text-xs">Pods:</span>
                    <span className="text-purple-400 font-mono text-xs animate-[pulse_0.5s_infinite]">INITIALIZING</span>
                </div>
            </div>
        </section>
    );
}
