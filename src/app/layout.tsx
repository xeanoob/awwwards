import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import GrainOverlay from './components/GrainOverlay';
import SmoothScroll from './components/SmoothScroll';
import { SoundProvider } from './components/SoundProvider';
import SoundToggle from './components/SoundToggle';
import AudioReactiveParticles from './components/AudioReactiveParticles';
import DoubleExposure from './components/DoubleExposure';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: '1820 | Cinematic Productions',
  description: 'Boutique film production agency',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-black text-[#F5F5F5] antialiased`}>
        <SoundProvider>
          <DoubleExposure />
          <AudioReactiveParticles />
          <Preloader />
          <GrainOverlay />
          <CustomCursor />
          <SoundToggle />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </SoundProvider>
      </body>
    </html>
  );
}
