'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';

type SoundContextType = {
  playClick: () => void;
  playHeartbeat: () => void;
  toggleMute: () => void;
  isMuted: boolean;
};

const SoundContext = createContext<SoundContextType>({
  playClick: () => {},
  playHeartbeat: () => {},
  toggleMute: () => {},
  isMuted: true,
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction to comply with browser autoplay policies
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const playClick = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Synthetic premium UI click (very short, sharp high-pass filtered noise/sine)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const playHeartbeat = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Low frequency double pulse for a heartbeat
    const playPulse = (time: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(50, time);
      osc.frequency.exponentialRampToValueAtTime(30, time + 0.1);
      
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.5, time + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(time);
      osc.stop(time + 0.3);
    };

    playPulse(ctx.currentTime);
    playPulse(ctx.currentTime + 0.2); // Second thud
  };

  const toggleMute = () => {
    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // ensure context is resumed
    if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
    }
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider value={{ playClick, playHeartbeat, toggleMute, isMuted }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
