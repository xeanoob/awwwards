'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Philosophy() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={container} className="relative py-40 md:py-64 px-8 md:px-16 bg-black min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 grayscale"
          src="/videos/video5.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl w-full text-center md:text-left" 
        data-cursor="mask"
      >
        <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-white/30 mb-8 block">
            Core Philosophy
        </span>
        <h2 className="font-serif text-5xl md:text-[8vw] leading-[0.9] tracking-tighter text-white/90">
          Digital Art.
          <br />
          <span className="italic">The Illusion of Time.</span>
        </h2>
        <div className="mt-12 md:mt-20 flex justify-end">
            <p className="max-w-md font-sans text-sm md:text-base text-white/50 leading-relaxed text-right italic">
                “We don&apos;t just capture moments; we sculpt them. Every frame is a decision to bend the reality you thought you knew.”
            </p>
        </div>
      </motion.div>
    </section>
  );
}
