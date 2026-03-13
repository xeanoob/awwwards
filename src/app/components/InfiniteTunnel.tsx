'use client';

import { useRef, useMemo } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface LayerProps {
  layer: { title: string; img: string };
  index: number;
  scrollYProgress: any;
}

function TunnelLayer({ layer, index, scrollYProgress }: LayerProps) {
  // By multiplying index, we space them out on the Z axis.
  // scrollYProgress moves them aggressively towards the camera (Z increases)
  const zOffset = -index * 1500;
  
  // When scrollYProgress goes from 0 to 1, z goes from zOffset to zOffset + 8000
  const z = useTransform(scrollYProgress, [0, 1], [zOffset, zOffset + 8000]);
  
  // Fade out as it passes the camera (z > 500) and fade in from deep
  const opacity = useTransform(
      z,
      [-5000, -1000, 500, 1000],
      [0, 1, 1, 0]
  );
  
  // Alternate left/right offset to create a tunnel gallery
  const xOffset = index % 2 === 0 ? '-30%' : '30%';

  return (
      <motion.div 
          style={{ 
              z,
              opacity,
              x: xOffset,
              backgroundImage: `url(${layer.img})` 
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="font-serif text-5xl md:text-8xl text-white tracking-tighter opacity-80">{layer.title}</h3>
          </div>
      </motion.div>
  );
}

export default function InfiniteTunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'] // Animate while it is anywhere in the viewport
  });

  // Array of 6 images representing tunnel layers
  const layers = [
    { title: "MOMENT", img: "/images/about.jpg" },
    { title: "SPEED", img: "/images/about.jpg" },
    { title: "FOCUS", img: "/images/about.jpg" },
    { title: "LIGHT", img: "/images/about.jpg" },
    { title: "TIME", img: "/images/about.jpg" },
    { title: "OFFSET", img: "/images/about.jpg" }
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black overflow-hidden flex flex-col items-center">
      {/* Sticky container that holds the tunnel */}
      <div className="sticky top-0 h-screen w-full perspective-[1000px] overflow-hidden flex items-center justify-center">
        
        {/* The Tunnel Origin point */}
        <div className="absolute w-[50vw] h-[50vh] md:w-[30vw] md:h-[40vh] transform-style-3d">
            {layers.map((layer, index) => (
                <TunnelLayer 
                    key={index} 
                    layer={layer} 
                    index={index} 
                    scrollYProgress={scrollYProgress} 
                />
            ))}
        </div>
        
        {/* Title for the segment */}
        <div className="absolute top-20 text-center z-[100] w-full pointer-events-none mix-blend-difference">
          <h2 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">
            Z-Axis Infinite Protocol
          </h2>
        </div>
      </div>
    </section>
  );
}
