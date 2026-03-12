'use client';

import { useEffect, useRef } from 'react';

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, size: number, opacity: number, growth: number, fade: number }[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Spawn ink particle
      for(let i=0; i<3; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 10,
          y: mouse.y + (Math.random() - 0.5) * 10,
          size: Math.random() * 15 + 5,
          opacity: Math.random() * 0.3 + 0.1,
          growth: Math.random() * 0.8 + 0.2, // how fast it expands
          fade: Math.random() * 0.015 + 0.005 // how fast it fades
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      ctx.globalCompositeOperation = 'screen';
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.size += p.growth;
        p.opacity -= p.fade;
        p.y -= 0.5; // slight upward drift like smoke/ink rising
        p.x += (Math.random() - 0.5) * 1; // Slight random drift
        
        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        // Cinematic cool fluid color (icy white/blue)
        ctx.fillStyle = `rgba(200, 220, 255, ${p.opacity})`; 
        // Soft gaussian-like circle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(200, 220, 255, ${p.opacity})`);
        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[90] mix-blend-screen opacity-60"
    />
  );
}
