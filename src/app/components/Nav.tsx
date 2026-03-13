'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import MagneticButton from './MagneticButton';
import MenuOverlay from './MenuOverlay';
import { useSound } from './SoundProvider';
import LiquidLogo from './LiquidLogo';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { playClick } = useSound();

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }} // Delay after preloader
        className="fixed top-0 left-0 w-full z-[90] flex justify-between items-center px-8 md:px-16 py-10 mix-blend-difference text-white pointer-events-none"
      >
        <MagneticButton className="pointer-events-auto">
           <LiquidLogo />
        </MagneticButton>
        
        <div className="pointer-events-auto">
          <MagneticButton>
            <button 
              onClick={() => { setMenuOpen(true); playClick(); }}
              className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] font-medium hover:opacity-50 transition-opacity border px-4 py-2 rounded-full border-white/20 hover:border-white/50"
              data-cursor="view"
            >
              [ ARCHIVE ]
            </button>
          </MagneticButton>
        </div>
      </motion.nav>

      {/* Fullscreen Designer Menu */}
      <MenuOverlay isOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
    </>
  );
}
