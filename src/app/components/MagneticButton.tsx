'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className, type = 'attract', strength = 0.3 }: { children: React.ReactNode, className?: string, type?: 'attract' | 'flee', strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    const factor = type === 'attract' ? strength : -strength * 1.5;
    setPosition({ x: middleX * factor, y: middleY * factor });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className || ''}`}
    >
      {children}
    </motion.div>
  );
}
