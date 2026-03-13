'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

export default function StickyMaskReveal() {
  const container = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress through the massive 300vh container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  // Scale the mask from a tiny circle (0) to massively covering the screen (300)
  const maskSize = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const clipPath = useMotionTemplate`circle(${maskSize}vw at center center)`;
  
  // Fade out foreground text as mask grows
  const foregroundOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const foregroundScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  
  // Fade in background text as mask grows
  const backgroundOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const backgroundScale = useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1]);

  return (
    <section ref={container} className="relative h-[300vh] bg-black">
      {/* The sticky element that stays on screen while scrolling through the 300vh */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background text that gets revealed */}
        <motion.div 
            style={{ opacity: backgroundOpacity, scale: backgroundScale }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 px-8 text-center"
        >
            <h2 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter italic text-white/90 uppercase">
                Liquid Architecture.
            </h2>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40 mt-12 max-w-md">
                Manipulating the boundaries of digital experience.
            </p>
        </motion.div>

        {/* Foreground solid layer with the expanding CSS clip-path mask */}
        <motion.div 
            className="absolute inset-0 bg-[#F5F5F5] z-10 flex flex-col items-center justify-center text-center px-8"
            style={{
                clipPath,
            }}
        >
            <motion.div style={{ opacity: foregroundOpacity, scale: foregroundScale }}>
                <h2 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter italic text-black/90 mix-blend-difference uppercase">
                    Beyond Boundaries.
                </h2>
                 <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-black/40 mt-12 mix-blend-difference max-w-md">
                    Scroll to distort reality.
                </p>
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
