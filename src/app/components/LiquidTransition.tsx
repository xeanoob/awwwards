'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

const narrative = [
  "TIME IS A FLUID...",
  "TRACING THE DISTORTION...",
  "ARCHIVE_VIVANTE_01",
  "BENDING REALITY...",
  "MEMORY FRAGMENT FOUND",
];

interface LiquidTransitionProps {
  isVisible?: boolean;
  onComplete?: () => void;
}

export default function LiquidTransition({ isVisible, onComplete }: LiquidTransitionProps) {
  const pathname = usePathname();
  const [internalTransitioning, setInternalTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const isFirstMount = useRef(true);

  const active = isVisible !== undefined ? isVisible : internalTransitioning;

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setInternalTransitioning(true);
    setDisplayText(narrative[Math.floor(Math.random() * narrative.length)]);
    const timer = setTimeout(() => {
      setInternalTransitioning(false);
      onComplete?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle text when manually triggered
  useEffect(() => {
    if (isVisible) {
      setDisplayText(narrative[Math.floor(Math.random() * narrative.length)]);
    }
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-[100px]"
        >
          {/* Stretch & Blur Effect Container */}
          <motion.div 
            initial={{ scaleY: 0.1, scaleX: 1.5, opacity: 0, filter: 'blur(20px)' }}
            animate={{ scaleY: 1, scaleX: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scaleY: 0.1, scaleX: 1.5, opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="font-serif text-5xl md:text-[6vw] text-white italic tracking-tighter mix-blend-difference">
              {displayText}
            </h2>
            <div className="w-64 h-[1px] bg-white/20 mt-8 overflow-hidden">
               <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-white"
               />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
