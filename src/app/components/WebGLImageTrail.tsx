'use client';

import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

// The shader that handles fading to grayscale as the image vanishes
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  varying vec2 vUv;
  
  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Grayscale conversion
    vec3 grayscale = vec3(dot(texColor.rgb, vec3(0.299, 0.587, 0.114)));
    
    // Mix between full color and grayscale based on opacity (starts colored, turns B&W as it fades)
    vec3 finalColor = mix(grayscale, texColor.rgb, uOpacity);
    
    gl_FragColor = vec4(finalColor, texColor.a * uOpacity);
  }
`;

function ImagePlane({ position, textureUrl, index, onComplete }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(textureUrl);
  const life = useRef(1.0); // Starts at 1.0, fades to 0.0

  // Random slight rotation for organic placement
  const rotation = useMemo(() => (Math.random() - 0.5) * 0.4, []);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uOpacity: { value: 1.0 }
  }), [texture]);

  useFrame((state, delta) => {
    life.current -= delta * 0.6; // Speed of the fade out
    
    if (meshRef.current && materialRef.current) {
      // Drift upwards like smoke/memory
      meshRef.current.position.y += delta * 0.3;
      
      // Slight expansion as it fades
      const scale = 1.0 + (1.0 - life.current) * 0.1;
      meshRef.current.scale.set(scale, scale, 1);
      
      materialRef.current.uniforms.uOpacity.value = Math.max(0, life.current);
    }

    if (life.current <= 0) {
      onComplete(index);
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, rotation]}>
      <planeGeometry args={[3, 4.2]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthTest={false}
      />
    </mesh>
  );
}

function TrailManager({ images }: { images: string[] }) {
  const { viewport, size } = useThree();
  const [planes, setPlanes] = useState<{id: number, position: [number, number, number], url: string}[]>([]);
  const lastSpawnTime = useRef(0);
  const lastMousePos = useRef(new THREE.Vector2());
  const planeIndex = useRef(0);

  // We need to track the mouse in the DOM space and convert to Three.js space
  const mouse = useRef(new THREE.Vector2());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to +1)
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const distance = lastMousePos.current.distanceTo(mouse.current);

    // Spawn threshold: must move a certain distance AND a certain time must have passed
    if (distance > 0.05 && time - lastSpawnTime.current > 0.1) {
      
      // Convert normalized screen coordinates to world units
      const x = (mouse.current.x * viewport.width) / 2;
      const y = (mouse.current.y * viewport.height) / 2;

      const newId = planeIndex.current++;
      const imgUrl = images[newId % images.length];

      setPlanes((prev) => [...prev, { id: newId, position: [x, y, 0], url: imgUrl }]);
      
      lastMousePos.current.copy(mouse.current);
      lastSpawnTime.current = time;
    }
  });

  const removePlane = (idToRemove: number) => {
    setPlanes((prev) => prev.filter(p => p.id !== idToRemove));
  };

  return (
    <group>
      {planes.map((p) => (
        <ImagePlane 
          key={p.id} 
          index={p.id} 
          position={p.position} 
          textureUrl={p.url} 
          onComplete={removePlane} 
        />
      ))}
    </group>
  );
}

// Wrapper Component
export default function WebGLImageTrail({ images }: { images: string[] }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
       <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <TrailManager images={images} />
       </Canvas>
    </div>
  );
}
