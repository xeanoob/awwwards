'use client';

import { useSound } from './SoundProvider';

export default function Footer() {
  const { playClick } = useSound();

  return (
    <footer className="relative w-full bg-[#050505] text-[#F5F5F5] flex flex-col justify-between p-8 md:p-16 border-t border-white/10 mt-32 min-h-[60vh]">
      
      <div className="flex justify-between items-start mt-16 md:mt-16">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tighter mb-4 italic">Let's create.</h2>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-60">
            Elevating visual narratives.
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-2 text-[10px] uppercase tracking-widest font-sans font-medium">
          <a href="mailto:hello@1820.studio" className="hover:opacity-50 transition-opacity" data-cursor="view" onClick={playClick}>hello@1820.studio</a>
          <a href="tel:+33100000000" className="hover:opacity-50 transition-opacity" data-cursor="view" onClick={playClick}>+33 1 00 00 00 00</a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end pb-8 mt-24">
        <div className="font-serif text-[18vw] md:text-[15vw] leading-[0.7] tracking-tighter opacity-90 select-none">
          1820
        </div>
        
        <div className="flex gap-8 font-sans text-[10px] uppercase tracking-[0.3em] font-medium opacity-60 mt-8 md:mt-0">
          <a href="#" className="hover:opacity-100 transition-opacity" onClick={playClick}>Instagram</a>
          <a href="#" className="hover:opacity-100 transition-opacity" onClick={playClick}>Vimeo</a>
          <a href="#" className="hover:opacity-100 transition-opacity" onClick={playClick}>LinkedIn</a>
        </div>
      </div>
      
    </footer>
  );
}
