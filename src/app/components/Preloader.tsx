'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundProvider';

const cutWords = ["MOTION", "VISION", "ELEVATED", "1820"];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cutIndex, setCutIndex] = useState(-1);
  const { playHeartbeat } = useSound();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start the Cut Sequence
          let cIndex = 0;
          playHeartbeat(); // First beat
          
          const cutInterval = setInterval(() => {
            setCutIndex(cIndex);
            cIndex++;
            if (cIndex % 2 === 0 && cIndex < cutWords.length) {
                playHeartbeat(); // Beat on specific words
            }
            if (cIndex > cutWords.length) {
              clearInterval(cutInterval);
              setTimeout(() => setIsLoading(false), 400); // Wait longer before completely fading out
            }
          }, 350); // Increased from 150 to 350 so the user can read the words
          
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 1; // Slower progress increments
      });
    }, 120); // Slower global polling from 80 to 120

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} // Cinematic blur exit
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          {cutIndex === -1 ? (
            <>
              {/* Normal Loading State */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="font-serif text-6xl md:text-[8vw] leading-none text-white tracking-tighter"
                >
                  1820
                </motion.div>
              </div>
              <div className="absolute bottom-16 right-16 font-sans text-xs uppercase tracking-[0.3em] text-white">
                {progress}%
              </div>
            </>
          ) : (
            // The Cut Sequence
            <div className="absolute inset-0 bg-white flex items-center justify-center mix-blend-difference">
              <h1 className="font-serif text-[15vw] leading-none text-black tracking-tighter uppercase italic">
                {cutWords[cutIndex]}
              </h1>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
