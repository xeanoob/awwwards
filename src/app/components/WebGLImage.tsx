'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHoverState;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Liquid displacement effect on hover
    uv.y += sin(uv.x * 20.0 + uTime * 2.0) * 0.05 * uHoverState;
    uv.x += cos(uv.y * 20.0 + uTime * 2.0) * 0.05 * uHoverState;
    
    // Zoom effect
    uv = mix(uv, (uv - 0.5) * 0.8 + 0.5, uHoverState);

    vec4 tex = texture2D(uTexture, uv);
    
    // Grayscale to Color transition
    float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    vec3 finalColor = mix(vec3(gray) * 0.4, tex.rgb, uHoverState);

    gl_FragColor = vec4(finalColor, tex.a);
  }
`;

function Scene({ src }: { src: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(src);
  const [hovered, setHovered] = useState(false);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHoverState: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      
      const targetHover = hovered ? 1 : 0;
      materialRef.current.uniforms.uHoverState.value += (targetHover - materialRef.current.uniforms.uHoverState.value) * 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function WebGLImage({ src, className }: { src: string, className?: string }) {
  return (
    <div className={`relative ${className} overflow-hidden`} data-cursor="view">
      <Canvas camera={{ position: [0, 0, 0.5], fov: 50 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Scene src={src} />
      </Canvas>
      {/* Background to show while canvas loads */}
      <img src={src} alt="" className="w-full h-full object-cover grayscale opacity-20 absolute inset-0 -z-10" />
    </div>
  );
}
