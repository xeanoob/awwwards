'use client';

import * as THREE from 'three';
import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useVideoTexture, useTexture, Environment } from '@react-three/drei';
import { useSound } from './SoundProvider';
import { DistortionMaterial } from './DistortionMaterial';
import { useRouter } from 'next/navigation';

const projects = [
  { id: 1, title: 'KINETIC_SILK', client: 'OFFTIME SS25', imgUrl: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&w=1600', slug: 'kinetic-silk' },
  { id: 2, title: 'STRUCTURAL_NOIR', client: 'Saint Laurent', imgUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600', slug: 'structural-noir' },
  { id: 3, title: 'ATELIER_CHROME', client: 'Rick Owens', imgUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600', slug: 'atelier-chrome' },
  { id: 4, title: 'STRETCH_GRAIN', client: 'Nike Lab', imgUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600', slug: 'stretch-grain' },
  { id: 5, title: 'THE_COUTURE_VOID', client: 'Vogue France', imgUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600', slug: 'couture-void' },
];

function VideoCard({ project, index, total, radius, velocityRef, onClick }: any) {
  const texture = useTexture(project.imgUrl) as THREE.Texture;
  const [hovered, setHover] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
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
          const targetScale = hovered ? 1.05 : 1;
          meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);

          if (hovered) {
            setHoverTime(prev => {
              const next = prev + delta;
              if (next > 1.2 && !showDetails) setShowDetails(true);
              return next;
            });
          } else {
            setHoverTime(0);
            if (showDetails) setShowDetails(false);
          }
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
        onClick={(e) => { 
          e.stopPropagation(); 
          // Only trigger if we weren't just dragging
          if (Math.abs(velocityRef.current) < 0.5) {
            onClick(); 
          }
        }}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[4, 7]} />
        <meshBasicMaterial map={texture} color={hovered ? "white" : "#888"} transparent opacity={hovered ? 1 : 0.8} />
      </mesh>
      
      {/* Project Title */}
      <Text 
        position={[0, -4, 0.1]} 
        fontSize={0.4} 
        color="#ffffff" 
        anchorX="center"
        fillOpacity={hovered ? 1 : 0.5}
        raycast={() => null}
      >
        {project.title}
      </Text>
      <Text 
        position={[0, -4.4, 0.1]} 
        fontSize={0.12} 
        color="#ffffff" 
        anchorX="center"
        letterSpacing={0.3}
        fillOpacity={hovered ? 0.8 : 0.2}
        raycast={() => null}
      >
        {project.client.toUpperCase()}
      </Text>

      {/* Archive Vivante Hidden Details */}
      {showDetails && (
        <group position={[0, 0, 0.2]}>
           <Text 
            position={[-1.4, 3, 0]} 
            fontSize={0.08} 
            color="#ffffff" 
            anchorX="left"
            maxWidth={2}
            raycast={() => null}
          >
            {"FRAG_ID: " + (index + 1092).toString(16).toUpperCase()}
          </Text>
          <Text 
            position={[1.4, -3, 0]} 
            fontSize={0.07} 
            color="#ffffff" 
            anchorX="right"
            raycast={() => null}
          >
            {"COORD: " + (48.8 + index).toFixed(1) + "N, " + (2.3 + index).toFixed(1) + "E"}
          </Text>
          <Text 
            position={[0, 0, 0]} 
            fontSize={0.15} 
            color="#ffffff" 
            anchorX="center"
            fillOpacity={0.1}
            raycast={() => null}
          >
            LIVING ARCHIVE
          </Text>
        </group>
      )}
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
            velocityRef={velocityRef}
            onClick={() => onProjectClick ? onProjectClick(project.id) : null}
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

interface WebglCarouselProps {
  onProjectClick?: () => void;
}

export default function WebglCarousel({ onProjectClick }: WebglCarouselProps) {
  const router = useRouter();
  const velocityRef = useRef(0);
  const isDragging = useRef(false);
  const prevX = useRef(0);
  const { playHeartbeat } = useSound();

  const handleProjectClick = (id: number) => {
    onProjectClick?.();
    const project = projects.find(p => p.id === id);
    if (project?.slug) {
      router.push(`/work/${project.slug}`);
    }
  };

  const [mouseDownTime, setMouseDownTime] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    prevX.current = e.clientX;
    setMouseDownTime(Date.now());
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

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    document.body.style.cursor = 'auto';
    
    // If the mouse was down for less than 200ms and didn't move much, 
    // we let the project click through. (R3F handles the mesh click separately)
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

      <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Ring velocityRef={velocityRef} onProjectClick={handleProjectClick} />
        </Suspense>
      </Canvas>
      
      {/* Synthetic intense film grain overlay that scales with drag */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] animate-pulse" />
    </div>
  );
}
