'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'mask'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isMounted) return null;
  if (window.matchMedia('(max-width: 768px)').matches) return null;

  const isView = cursorState === 'view';
  const isMask = cursorState === 'mask';

  let size = 20;
  let offset = 10;
  if (isView) { size = 80; offset = 40; }
  else if (isMask) { size = 350; offset = 175; }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference flex items-center justify-center bg-white rounded-full"
      animate={{
        x: position.x - offset,
        y: position.y - offset,
        width: size,
        height: size,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.5 }}
      style={{ opacity: isVisible ? 1 : 0 }}
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
