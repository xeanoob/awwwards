'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Path for a liquid wipe effect
const initialPath = `M0 0 L0 0 Q50vw 0 100vw 0 L100vw 0Z`;
const targetPath = `M0 0 L0 100vh Q50vw 100vh 100vw 100vh L100vw 0Z`;
const curvePath = `M0 0 L0 50vh Q50vw 100vh 100vw 50vh L100vw 0Z`;

export default function LiquidTransition({ isVisible, onComplete }: { isVisible: boolean, onComplete: () => void }) {
  
  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: [initialPath, curvePath, targetPath],
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: [targetPath, curvePath, initialPath],
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div className="fixed inset-0 z-[150] pointer-events-none flex flex-col justify-center items-center">
          <svg className="w-full h-[150vh] absolute top-[-25vh] left-0 pointer-events-none" preserveAspectRatio="none">
            <motion.path 
              variants={curve} 
              initial="initial" 
              animate="enter" 
              exit="exit" 
              fill="#050505" 
            />
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="z-10 font-serif text-6xl text-white italic tracking-tighter"
          >
            Entering Project
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
