'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function StickyMaskReveal() {
  const container = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress through the massive 300vh container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  // Scale the mask from a tiny circle (0) to massively covering the screen (300)
  const maskSize = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section ref={container} className="relative h-[300vh] bg-black">
      {/* The sticky element that stays on screen while scrolling through the 300vh */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background text that gets revealed */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 px-8 text-center">
            <h2 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter italic text-white/90">
                Time is a Construct.
            </h2>
            <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-white/50 mt-8">
                We design the reality you perceive.
            </p>
        </div>

        {/* Foreground solid layer with the expanding CSS clip-path mask */}
        <motion.div 
            className="absolute inset-0 bg-[#F5F5F5] z-10 flex flex-col items-center justify-center text-center px-8"
            style={{
                // We use CSS clip-path to cut a hole in this div.
                // The hole grows based on scroll.
                clipPath: `circle(${maskSize.get()}vw at center center)`,
            }}
        >
            <h2 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter italic text-black/90 mix-blend-difference">
                Reality is Malleable.
            </h2>
             <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-black/50 mt-8 mix-blend-difference">
                Scroll to manipulate perception
            </p>
        </motion.div>

      </div>
    </section>
  );
}
