'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  '/images/about.jpg',
  '/images/about.jpg',
  '/images/about.jpg',
  '/images/about.jpg',
];

export default function BehindTheScenesGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']); // -75% because 4 images of 100vw = 400vw. We stop at the last one.

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-10 left-10 md:left-20 z-10 mix-blend-difference">
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tighter italic">
            Behind the Lens
          </h2>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 mt-2">
            Horizontal Stacking
          </p>
        </div>

        <motion.div style={{ x }} className="flex h-[60vh] md:h-[80vh] gap-10 md:gap-20 px-[10vw]">
          {images.map((img, i) => (
            <div 
              key={i} 
              className="relative h-full w-[80vw] md:w-[60vw] shrink-0 overflow-hidden"
              data-cursor="view"
            >
              <img 
                src={img} 
                alt="BTS" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 ease-out"
              />
              <div className="absolute bottom-10 flex w-full justify-between items-end px-10 mix-blend-difference pointer-events-none">
                <span className="font-sans text-xs tracking-[0.2em] text-white uppercase opacity-70">BTS Vol. {i + 1}</span>
                <span className="font-serif text-4xl text-white italic">1820</span>
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
