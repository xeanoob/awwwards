'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Elegant, slow loading progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800); // Linger on 100%
          return 100;
        }
        
        // Non-linear easing for the counter
        const increment = prev < 80 ? Math.random() * 2 + 0.5 : Math.random() * 0.5 + 0.1;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const formattedProgress = progress.toFixed(0).padStart(3, '0');

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-between pointer-events-none p-12 md:p-16"
        >
            
          <div className="w-full flex justify-between font-sans text-[10px] md:text-sm uppercase tracking-[0.3em] text-[#A0A0A0]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              OffTime
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Paris — London
            </motion.div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[15vw] md:text-[12vw] leading-none text-white tracking-tighter"
            >
              {formattedProgress}
            </motion.div>
          </div>

          <div className="w-full flex justify-between font-sans text-[10px] uppercase tracking-[0.3em] text-[#A0A0A0] items-end">
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Loading Experience
            </motion.div>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="h-[1px] bg-white absolute bottom-16 left-16 right-16 origin-left mix-blend-difference"
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
