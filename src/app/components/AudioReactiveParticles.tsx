'use client';

import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  
  useEffect(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for(let i=0; i<count*3; i++) {
      pos[i] = (Math.random() - 0.5) * 30; // Spread across a large area
    }
    setPositions(pos);
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
        const time = state.clock.elapsedTime;
        // Simulated global audio bounce
        const bounce = Math.sin(time * 8.0) * 0.5 + 0.5;
        
        pointsRef.current.rotation.y += delta * 0.05;
        pointsRef.current.rotation.x += delta * 0.02;

        const scale = 1.0 + Math.pow(bounce, 4) * 0.2;
        pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  if (!positions) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
            attach="attributes-position" 
            args={[positions, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.07} 
        color="#ffffff" 
        transparent 
        opacity={0.3} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function AudioReactiveParticles() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 15] }}>
                <Particles />
            </Canvas>
        </div>
    );
}
