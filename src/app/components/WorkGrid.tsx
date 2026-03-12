'use client';

import { useState } from 'react';
import { useSound } from './SoundProvider';
import LiquidTransition from './LiquidTransition';
import WebglCarousel from './WebglCarousel';

export default function WorkGrid() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playHeartbeat } = useSound();

  const handleProjectClick = () => {
    playHeartbeat();
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 2500);
  };

  return (
    <>
      <WebglCarousel onProjectClick={handleProjectClick} />
      <LiquidTransition isVisible={isTransitioning} onComplete={() => {}} />
    </>
  );
}
