'use client';

import * as THREE from 'three';
import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useVideoTexture, Environment } from '@react-three/drei';
import { useSound } from './SoundProvider';

const projects = [
  { id: 1, title: 'Lumina', client: 'Fashion House', videoUrl: '/videos/video1.mp4' },
  { id: 2, title: 'Echoes', client: 'Automotive', videoUrl: '/videos/video2.mp4' },
  { id: 3, title: 'Aether', client: 'Fragrance', videoUrl: '/videos/video3.mp4' },
  { id: 4, title: 'Velocity', client: 'Sportswear', videoUrl: '/videos/video4.mp4' },
  { id: 5, title: 'Noir', client: 'Editorial', videoUrl: '/videos/video5.mp4' },
];

function VideoCard({ project, index, total, radius, onClick }: any) {
  const texture = useVideoTexture(project.videoUrl, { crossOrigin: 'Anonymous' });
  const [hovered, setHover] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const { playClick } = useSound();

  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  // Rotate to face outwards
  const rotationY = angle;

  useFrame((state, delta) => {
      if (meshRef.current) {
          // Smooth hover scale
          const targetScale = hovered ? 1.1 : 1;
          meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
      }
  });

  return (
    <group 
        position={[x, 0, z]} 
        rotation={[0, rotationY, 0]}
    >
      <mesh 
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); playClick(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[4.8, 2.7]} />
        <meshBasicMaterial map={texture} toneMapped={false} color={hovered ? "#ffffff" : "#666666"} />
      </mesh>
      
      {/* Project Title */}
      <Text 
        position={[0, -1.8, 0.1]} 
        fontSize={0.4} 
        font="/fonts/PlayfairDisplay-Italic.ttf" // Assuming we have or just use default
        color="#ffffff" 
        anchorX="center"
        fillOpacity={hovered ? 1 : 0.5}
      >
        {project.title}
      </Text>
      <Text 
        position={[0, -2.2, 0.1]} 
        fontSize={0.15} 
        color="#ffffff" 
        anchorX="center"
        letterSpacing={0.2}
        fillOpacity={hovered ? 0.8 : 0.3}
      >
        {project.client.toUpperCase()}
      </Text>
    </group>
  );
}

function Ring({ velocityRef, onProjectClick }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 6.5;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Apply velocity
      groupRef.current.rotation.y += velocityRef.current * delta;
      
      // Friction / Damping
      velocityRef.current *= 0.92;
      
      // Minimum auto-rotation
      if (Math.abs(velocityRef.current) < 0.1) {
         groupRef.current.rotation.y -= 0.05 * delta;
      }

      // Add a slight bobbing effect to the ring
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => (
        <VideoCard 
            key={project.id} 
            project={project} 
            index={i} 
            total={projects.length} 
            radius={radius} 
            onClick={() => onProjectClick(project.id)}
        />
      ))}
    </group>
  );
}

// Intense Film Grain based on Rotation Velocity
function PostProcessingEffect({ velocityRef }: any) {
    // A simple way to add grain without heavy post-processing library is via HTML overlay with opacity based on velocity
    return null;
}

export default function WebglCarousel({ onProjectClick }: { onProjectClick: () => void }) {
  const velocityRef = useRef(0);
  const isDragging = useRef(false);
  const prevX = useRef(0);
  const { playHeartbeat } = useSound();

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    prevX.current = e.clientX;
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      const delta = e.clientX - prevX.current;
      velocityRef.current += delta * 0.02; // Sensitivity
      prevX.current = e.clientX;
      
      // Add subtle noise to the page while spinning fast?
      if (Math.abs(velocityRef.current) > 2) {
          playHeartbeat(); // Trigger heartbeat on violent spins
      }
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    document.body.style.cursor = 'auto';
  };

  return (
    <div 
        className="relative w-full h-[120vh] bg-black overflow-hidden flex flex-col justify-center items-center"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
    >
      <div className="absolute top-20 text-center z-10 w-full pointer-events-none">
          <h2 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">
            Selected Works — Drag to Spin
          </h2>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Ring velocityRef={velocityRef} onProjectClick={onProjectClick} />
        </Suspense>
      </Canvas>
      
      {/* Synthetic intense film grain overlay that scales with drag */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] animate-pulse" />
    </div>
  );
}
