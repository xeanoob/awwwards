'use client';

import { useSound } from './SoundProvider';

export default function SoundToggle() {
  const { isMuted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-10 right-10 mix-blend-difference z-[90] text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] font-medium text-white hover:opacity-50 transition-opacity flex items-center gap-3"
      data-cursor="view"
    >
      <span>Sound</span>
      <span className="w-8 h-px bg-white/50 relative">
        <span 
          className="absolute top-0 right-0 w-full h-full bg-white transition-all duration-300 origin-right" 
          style={{ transform: isMuted ? 'scaleX(0)' : 'scaleX(1)' }}
        />
      </span>
      <span>{isMuted ? 'Off' : 'On'}</span>
    </button>
  );
}
