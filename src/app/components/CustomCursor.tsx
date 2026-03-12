'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'mask'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Use MotionValues to bypass React render cycle for buttery smooth tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    // Hide default cursor globally
    document.body.style.cursor = 'none';

    // To ensure Links don't force a pointer cursor
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="mask"]')) {
        setCursorState('mask');
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorState('view');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.head.removeChild(style);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isMounted) return null;
  
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
     return null;
  }

  const isView = cursorState === 'view';
  const isMask = cursorState === 'mask';

  let size = 20;
  if (isView) size = 80;
  else if (isMask) size = 350;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center bg-white rounded-full"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0
      }}
      animate={{
        width: size,
        height: size,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <AnimatePresence>
        {isView && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-black text-xs font-bold uppercase tracking-widest"
          >
            View
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
