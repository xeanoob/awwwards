'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const btsData = [
  { title: 'THE ATELIER', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200' }, 
  { title: 'KINETIC_FLOW', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200' }, 
  { title: 'STRUCTURAL_NOIR', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200' }, 
  { title: 'AVANT_GARDE', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200' }, 
  { title: 'RUNWAY_PREP', img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200' }, 
  { title: 'THE_PREP', img: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1200' }, 
];

export default function BehindTheScenesGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-85%']); 

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-10 left-10 md:left-20 z-10 mix-blend-difference">
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tighter italic">
            Behind the Lens
          </h2>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 mt-2">
            Archive Vivante
          </p>
        </div>

        <motion.div style={{ x }} className="flex h-[60vh] md:h-[80vh] gap-10 md:gap-20 px-[10vw]">
          {btsData.map((item, i) => (
            <div 
              key={i} 
              className="relative h-full w-[80vw] md:w-[60vw] shrink-0 overflow-hidden"
              data-cursor="view"
            >
              <Image 
                src={item.img} 
                alt={item.title} 
                fill
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 ease-out"
                sizes="(max-width: 768px) 80vw, 60vw"
              />
              <div className="absolute bottom-10 flex w-full justify-between items-end px-10 mix-blend-difference pointer-events-none">
                <span className="font-sans text-xs tracking-[0.2em] text-white uppercase opacity-70">{item.title}</span>
                <span className="font-serif text-4xl text-white italic">{(i + 1).toString().padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
