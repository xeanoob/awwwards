import Nav from './components/Nav';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Expertise from './components/Expertise';
import SelectedClients from './components/SelectedClients';
import Marquee from './components/Marquee';
import StickyStacking from './components/StickyStacking';
import BehindTheScenesGallery from './components/BehindTheScenesGallery';
import WebglCarousel from './components/WebglCarousel';
import StickyMaskReveal from './components/StickyMaskReveal';
import Awards from './components/Awards';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      <Hero />
      <Philosophy />
      <StickyMaskReveal />
      <Expertise />
      <SelectedClients />
      <WebglCarousel />
      <Awards />
      <Marquee />
      <StickyStacking />
      <BehindTheScenesGallery />
      <Footer />
    </main>
  );
}
