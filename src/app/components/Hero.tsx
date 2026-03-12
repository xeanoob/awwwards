'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSound } from './SoundProvider';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const requestRef = useRef<number>(0);
  const targetTime = useRef(0);
  const currentTime = useRef(0);
  const { playClick } = useSound();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.pause(); 
    }
  };

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
        targetTime.current = latest * duration;
    });
    return () => unsub();
  }, [scrollYProgress, duration]);

  // Smooth interpolation loop for Scrubbing
  useEffect(() => {
    const renderLoop = () => {
      if (videoRef.current && duration > 0) {
        // Smooth lerp
        currentTime.current += (targetTime.current - currentTime.current) * 0.08;
        
        // Only update if difference is significant to avoid unnecessary DOM writes
        if (Math.abs(currentTime.current - videoRef.current.currentTime) > 0.01) {
             videoRef.current.currentTime = currentTime.current;
        }
      }
      requestRef.current = requestAnimationFrame(renderLoop);
    };
    requestRef.current = requestAnimationFrame(renderLoop);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [duration]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 0, 0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, -50, 50, 0]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-end p-8 pb-20">
        
        {/* Background Video for Scrubbing */}
        <div className="absolute inset-0 z-0 bg-black">
          <video
            ref={videoRef}
            muted
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover opacity-60"
            src="/videos/video1.mp4"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-8 md:px-16 flex flex-col h-full justify-between pt-40 pb-16 pointer-events-none">
            <div /> {/* Spacer */}
          
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="max-w-4xl"
          >
            <h1 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter mb-8 text-white">
              Visual Storytelling.
              <br />
              <span className="italic">Elevated.</span>
            </h1>
          </motion.div>
          
          <motion.div style={{ opacity: subOpacity }} className="flex justify-between items-end w-full">
            <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 max-w-sm">
                Scroll to control time.
            </p>
            {/* Play Button */}
            <div
              className="hidden md:flex items-center justify-center w-32 h-32 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors duration-500 pointer-events-auto cursor-pointer"
              data-cursor="view"
              onClick={playClick}
            >
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold">Scrub</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
