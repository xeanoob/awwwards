'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    id: '01',
    title: 'Direction',
    desc: 'Translating brand essence into visual poetry. We lead every frame with intent.',
    img: 'https://assets.mixkit.co/videos/51281/51281-720.mp4',
  },
  {
    id: '02',
    title: 'Cinematography',
    desc: 'Chasing light and shadow. Our lens captures the unspoken truth of the moment.',
    img: 'https://assets.mixkit.co/videos/47779/47779-720.mp4',
  },
  {
    id: '03',
    title: 'Post-Production',
    desc: 'The final polish. Grading, editing, and sound design that elevate the narrative.',
    img: 'https://assets.mixkit.co/videos/809/809-720.mp4',
  }
];

export default function StickyStacking() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="relative bg-black w-full" style={{ height: `${features.length * 100}vh` }}>
      {features.map((feature, i) => {
        const targetScale = 1 - (features.length - i) * 0.05;
        const indexProgress = scrollYProgress; // Simplified mapping for relative stacking

        return (
          <StickyCard 
            key={feature.id} 
            i={i} 
            {...feature} 
            progress={scrollYProgress} 
            range={[i * 0.33, 1]} 
            targetScale={targetScale} 
          />
        );
      })}
    </section>
  );
}

function StickyCard({ i, title, desc, id, img, progress, range, targetScale }: any) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }} 
        className="relative flex flex-col items-center justify-center w-full h-[90vh] md:w-[80vw] origin-top bg-[#111] overflow-hidden rounded-sm"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          src={img} 
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale brightness-75 mix-blend-luminosity"
        />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-10 md:p-20">
          <div className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-white/50">
            {id}
          </div>
          <div className="flex flex-col md:flex-row flex-end items-end gap-10">
            <h2 className="font-serif text-6xl md:text-[8vw] text-white tracking-tighter leading-none m-0">
              {title}
            </h2>
            <p className="font-sans text-[10px] md:text-xs text-white/70 uppercase tracking-[0.2em] max-w-[300px] leading-relaxed mb-4">
              {desc}
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
