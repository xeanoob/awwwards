'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import WebGLImage from './WebGLImage';

export default function AboutPreview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Increased parallax

  return (
    <section ref={ref} className="py-40 px-8 max-w-[1600px] mx-auto overflow-hidden bg-black text-white relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Typography - Staggered Text Reveal */}
        <motion.div style={{ y: y1 }} className="order-2 lg:order-1 flex flex-col justify-center max-w-2xl px-4 md:px-0 z-10" data-cursor="mask">
          <TextReveal 
            text="We craft <br/> motion that <br/> commands <br/> attention." 
            className="font-serif text-[45px] md:text-[6.5vw] leading-[0.85] mb-12 tracking-tighter" 
          />
          <div className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-60 flex flex-col gap-8 leading-[2.5]" data-cursor="default">
            <p className="text-justify indent-10 border-l border-white/20 pl-6">
              Established in the intersection of art and commerce, we are an independent production house dedicated to elevating brands through uncompromising visual narratives. We do not just film; we engineer emotional resonance.
            </p>
            <div className="w-full flex">
              <button className="border border-white/30 py-4 px-10 hover:bg-white hover:text-black transition-all duration-700 font-medium tracking-[0.4em] relative overflow-hidden group">
                <span className="relative z-10 uppercase text-[10px]">Discover Our Method</span>
                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right WebGL Asymmetrical Image */}
        <motion.div style={{ y: y2 }} className="order-1 lg:order-2 flex justify-end">
          <WebGLImage 
            src="/images/about.jpg" 
            className="w-full h-[60vh] md:h-[120vh] md:w-[70%] cinematic-mask overflow-hidden" 
          />
        </motion.div>
        
      </div>
    </section>
  );
}
