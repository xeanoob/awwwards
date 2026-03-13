'use client';

import { useSound } from './SoundProvider';

export default function Footer() {
  const { playClick } = useSound();

  return (
    <footer className="relative w-full bg-[#050505] text-[#F5F5F5] flex flex-col justify-between p-8 md:p-16 border-t border-white/10 mt-32 min-h-[60vh]">
      
      <div className="flex justify-between items-start mt-16 md:mt-16">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tighter mb-4 italic">Let&apos;s distort.</h2>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-60">
            Archive Vivante.
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-2 text-[10px] uppercase tracking-widest font-sans font-medium">
          <a href="mailto:boutrinambroise@gmail.com" className="hover:opacity-50 transition-opacity" data-cursor="view" onClick={playClick}>boutrinambroise@gmail.com</a>
          <a href="tel:+33100000000" className="hover:opacity-50 transition-opacity" data-cursor="view" onClick={playClick}>+33 1 00 00 00 00</a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end pb-8 mt-24">
        <div className="font-serif text-[18vw] md:text-[10vw] leading-[0.7] tracking-tighter opacity-90 select-none">
          OffTime
        </div>
        
        <div className="flex gap-8 font-sans text-[10px] uppercase tracking-[0.3em] font-medium opacity-60 mt-8 md:mt-0">
          <a href="http://instagram.com/ambroise.45" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" onClick={playClick}>Instagram</a>
          <a href="https://vsco.co/ambroise222/gallery" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" onClick={playClick}>VSCO</a>
          <a href="https://www.linkedin.com/in/ambroise-boutrin/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" onClick={playClick}>LinkedIn</a>
        </div>
      </div>
      
    </footer>
  );
}
