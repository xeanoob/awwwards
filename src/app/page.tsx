import Nav from './components/Nav';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Expertise from './components/Expertise';
import WorkGrid from './components/WorkGrid';
import FirstPersonMuseum from './components/FirstPersonMuseum';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import StickyStacking from './components/StickyStacking';
import BehindTheScenesGallery from './components/BehindTheScenesGallery';
import InfiniteTunnel from './components/InfiniteTunnel';

export default function Home() {
  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      <Hero />
      <Philosophy />
      <Expertise />
      <Marquee />
      <InfiniteTunnel />
      <StickyStacking />
      <WorkGrid />
      <BehindTheScenesGallery />
      <Footer />
    </main>
  );
}
