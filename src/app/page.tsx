import Nav from './components/Nav';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import AboutPreview from './components/AboutPreview';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import StickyStacking from './components/StickyStacking';
import BehindTheScenesGallery from './components/BehindTheScenesGallery';

export default function Home() {
  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <StickyStacking />
      <WorkGrid />
      <AboutPreview />
      <BehindTheScenesGallery />
      <Footer />
    </main>
  );
}
