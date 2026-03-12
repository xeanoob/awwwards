'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSound } from './SoundProvider';

const links = [
  { name: 'WORK', href: '#', img: '/images/about.jpg' },
  { name: 'STUDIO', href: '#', img: '/videos/video3.mp4', isVideo: true },
  { name: 'CONTACT', href: '#', img: '/videos/video2.mp4', isVideo: true },
];

export default function MenuOverlay({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const { playClick } = useSound();

  const menuVariants = {
    closed: { y: '-100%', transition: { staggerChildren: 0.1, staggerDirection: -1, ease: [0.76, 0, 0.24, 1], duration: 1 } },
    open: { y: '0%', transition: { staggerChildren: 0.1, delayChildren: 0.3, ease: [0.76, 0, 0.24, 1], duration: 1 } },
  };

  const linkVariants = {
    closed: { y: '100%', opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    open: { y: '0%', opacity: 1, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 bg-[#0A0A0A] z-[100] flex items-center px-10 md:px-20 py-32 overflow-hidden"
        >
          {/* Background Media Reveals */}
          {links.map((link, i) => (
            <div
              key={`media-${i}`}
              className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-out"
              style={{ opacity: hoveredLink === i ? 0.4 : 0 }}
            >
              {link.isVideo ? (
                <video src={link.img} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale brightness-50" />
              ) : (
                <img src={link.img} alt="" className="w-full h-full object-cover grayscale brightness-50" />
              )}
            </div>
          ))}

          {/* Close Button */}
          <button 
            onClick={toggleMenu}
            className="absolute top-10 right-10 md:right-16 z-50 text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] hover:opacity-50 transition-opacity"
            data-cursor="view"
          >
            [ CLOSE ]
          </button>

          {/* Navigation Links */}
          <nav className="relative z-10 w-full flex flex-col items-center md:items-start space-y-4 md:space-y-0 text-center md:text-left">
            {links.map((link, i) => (
              <div 
                key={i} 
                className="overflow-hidden" 
                onMouseEnter={() => { setHoveredLink(i); playClick(); }} 
                onMouseLeave={() => setHoveredLink(null)}
              >
                <motion.a
                  href={link.href}
                  variants={linkVariants}
                  className="block font-serif text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter text-white hover:italic transition-all duration-500"
                  style={{  
                    WebkitTextStroke: hoveredLink === i ? 'none' : '1px rgba(255,255,255,0.3)',
                    color: hoveredLink === i ? 'white' : 'transparent',
                  }}
                  onClick={() => { playClick(); toggleMenu(); }}
                >
                  {link.name}
                </motion.a>
              </div>
            ))}
          </nav>

          {/* Footer inside menu */}
          <motion.div 
            variants={linkVariants}
            className="absolute bottom-10 left-10 md:left-20 flex gap-10 font-sans text-[10px] tracking-[0.2em] uppercase opacity-50"
          >
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Vimeo</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
