'use client';

import * as THREE from 'three';
import { useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, useVideoTexture, Text } from '@react-three/drei';
import { useSound } from './SoundProvider';

const videos = [
    { url: '/videos/video1.mp4', pos: [0, 5, -20], rot: [0, 0, 0], scale: [16, 9, 1], title: 'LUMINA' },
    { url: '/videos/video2.mp4', pos: [-20, 5, 0], rot: [0, Math.PI / 2, 0], scale: [16, 9, 1], title: 'ECHOES' },
    { url: '/videos/video3.mp4', pos: [20, 5, 0], rot: [0, -Math.PI / 2, 0], scale: [16, 9, 1], title: 'AETHER' },
];

function VideoPainting({ data }: { data: any }) {
    const texture = useVideoTexture(data.url);
    
    return (
        <group position={data.pos} rotation={data.rot} scale={data.scale}>
            <mesh>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={texture} toneMapped={false} color="#dddddd" />
            </mesh>
            {/* The dramatic title below the painting */}
            <Text position={[0, -0.6, 0.1]} fontSize={0.1} color="white" anchorX="center" font="/fonts/PlayfairDisplay-Italic.ttf">
                {data.title}
            </Text>
        </group>
    );
}

function BrutalistRoom() {
    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#111111" roughness={0.8} />
            </mesh>
            
            {/* Ceiling */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 20, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
            </mesh>
            
            {/* Walls */}
            <mesh position={[0, 10, -30]}>
                <boxGeometry args={[60, 20, 1]} />
                <meshStandardMaterial color="#0d0d0d" roughness={1} />
            </mesh>
            <mesh position={[0, 10, 30]}>
                <boxGeometry args={[60, 20, 1]} />
                <meshStandardMaterial color="#0d0d0d" roughness={1} />
            </mesh>
            <mesh position={[-30, 10, 0]}>
                <boxGeometry args={[1, 20, 60]} />
                <meshStandardMaterial color="#0d0d0d" roughness={1} />
            </mesh>
            <mesh position={[30, 10, 0]}>
                <boxGeometry args={[1, 20, 60]} />
                <meshStandardMaterial color="#0d0d0d" roughness={1} />
            </mesh>

            {/* Video Projections */}
            {videos.map((v, i) => (
                <VideoPainting key={i} data={v} />
            ))}
        </group>
    );
}

export default function FirstPersonMuseum() {
    const { playClick, playHeartbeat } = useSound();
    
    return (
        <section className="relative h-screen w-full bg-black">
            <div className="absolute top-10 w-full text-center z-10 pointer-events-none mix-blend-difference">
                <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tighter italic mb-2">The Studio</h2>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50">Click to Explore — W,A,S,D to move</p>
            </div>
            
            <Canvas 
                camera={{ position: [0, 5, 20], fov: 60 }} 
                className="w-full h-full cursor-pointer"
                onPointerDown={() => { playClick(); playHeartbeat(); }}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[0, 15, 0]} intensity={1.5} distance={50} decay={2} />
                <fog attach="fog" args={['#000000', 10, 50]} />
                
                <Suspense fallback={null}>
                    <BrutalistRoom />
                </Suspense>

                {/* The FPS Controls */}
                <PointerLockControls />
            </Canvas>
        </section>
    );
}
