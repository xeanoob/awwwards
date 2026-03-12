'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Marquee() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-1000, 0]);

  return (
    <div ref={container} className="py-20 bg-black overflow-hidden flex flex-col gap-8 opacity-80 border-t border-b border-white/10 my-20">
      
      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={`row1-${i}`} className="flex items-center">
            <h1 className="text-[10vw] font-serif tracking-tighter mx-8 italic leading-none">COMMERCIAL</h1>
            <div className="w-4 h-4 rounded-full bg-white mx-8" />
            <h1 className="text-[10vw] font-serif tracking-tighter mx-8 leading-none text-transparent" style={{ WebkitTextStroke: '2px white' }}>MUSIC VIDEO</h1>
            <div className="w-4 h-4 rounded-full bg-white mx-8" />
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={`row2-${i}`} className="flex items-center">
            <h1 className="text-[10vw] font-serif tracking-tighter mx-8 leading-none text-transparent" style={{ WebkitTextStroke: '2px white' }}>DOCUMENTARY</h1>
            <div className="w-4 h-4 rounded-full bg-white mx-8" />
            <h1 className="text-[10vw] font-serif tracking-tighter mx-8 italic leading-none">FASHION FILM</h1>
            <div className="w-4 h-4 rounded-full bg-white mx-8" />
          </div>
        ))}
      </motion.div>
      
    </div>
  );
}
