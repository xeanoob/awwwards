'use client';

import * as THREE from 'three';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSound } from './SoundProvider';

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
  
  // Liquid / Smoke Distortion
  // More distortion at the top of the text (vUv.y close to 1.0)
  float noise = sin(uv.y * 15.0 + uTime * 3.0) * 0.05 * uHoverState;
  float noise2 = cos(uv.x * 20.0 + uTime * 2.0) * 0.03 * uHoverState;
  
  uv.x += noise + (uv.y * uHoverState * 0.1); 
  uv.y += noise2;

  // Dispersion effect (stretching upwards)
  uv.y -= uHoverState * 0.1 * (1.0 - uv.y);

  vec4 tex = texture2D(uTexture, uv);
  
  // Fade out top parts as it smokes away
  tex.a *= 1.0 - (uHoverState * (uv.y));

  gl_FragColor = tex;
}
`;

function LogoMesh({ playClick }: { playClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHover] = useState(false);
  const hoverState = useRef(0);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.clearRect(0, 0, 512, 256);
        ctx.font = 'bold 120px "Playfair Display", serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('OFFTIME', 512, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    // Needs linear filtering to not look pixelated
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, []);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uHoverState: { value: 0 },
    uTime: { value: 0 }
  }), [texture]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smoothly interpolate the hover state
      hoverState.current = THREE.MathUtils.lerp(hoverState.current, hovered ? 1 : 0, 0.05);
      materialRef.current.uniforms.uHoverState.value = hoverState.current;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => { setHover(true); playClick(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
      onClick={playClick}
    >
      <planeGeometry args={[8, 2]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function LiquidLogo() {
  const { playClick } = useSound();

  return (
    <div className="w-[200px] h-[50px] md:w-[320px] md:h-[80px] relative z-[100]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} className="w-full h-full pointer-events-auto">
        <LogoMesh playClick={playClick} />
      </Canvas>
    </div>
  );
}
