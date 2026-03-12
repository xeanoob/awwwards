'use client';

import * as THREE from 'three';
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// RGB Split Chromatic Aberration Shader
const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHover;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // The amount of RGB separation based on hover state
  float amount = uHover * 0.05; // Max 5% uv shift
  
  // Sample the color channels independently with slight UV offsets
  float r = texture2D(uTexture, vec2(uv.x + amount, uv.y)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, vec2(uv.x - amount, uv.y)).b;
  
  vec4 finalColor = vec4(r, g, b, 1.0);
  
  // Slight brightness boost on hover
  finalColor.rgb += uHover * 0.1;

  gl_FragColor = finalColor;
}
`;

export function DistortionMaterial({ texture, hovered }: { texture: THREE.Texture, hovered: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const hoverState = useRef(0);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uHover: { value: 0 }
  }), [texture]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      // Smoothly interpolate the hover state for butter-smooth transition
      hoverState.current = THREE.MathUtils.lerp(hoverState.current, hovered ? 1 : 0, 0.1);
      materialRef.current.uniforms.uHover.value = hoverState.current;
    }
  });

  return (
    <shaderMaterial 
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
}
