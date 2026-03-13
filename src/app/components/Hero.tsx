'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-end p-8 pb-20 bg-black">
      {/* Background Video with Parallax (No Zooming) */}
      <motion.div 
        style={{ y: backgroundY }} 
        className="absolute inset-0 z-0 bg-black"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          src="https://assets.mixkit.co/videos/50641/50641-720.mp4"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-16 flex flex-col justify-end h-full pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="max-w-4xl"
        >
          <h1 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter mb-8 text-white">
            Couture.
            <br />
            <span className="italic">In Motion.</span>
          </h1>
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-white/70">
            The Art of the Cut. The Soul of the Frame.
          </p>
        </motion.div>

        {/* Play Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
          className="hidden md:flex items-center justify-center w-32 h-32 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer absolute bottom-16 right-16"
          data-cursor="view"
        >
          <span className="text-[10px] uppercase tracking-widest font-sans font-bold">Play Reel</span>
        </motion.div>
      </div>
    </section>
  );
}
