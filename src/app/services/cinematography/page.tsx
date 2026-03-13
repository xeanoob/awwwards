import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function CinematographyPage() {
  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      
      {/* Cinema Hero */}
      <section className="relative pt-40 pb-24 px-8 md:px-16 min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-40 right-8 md:right-16 text-[10px] tracking-[0.5em] uppercase opacity-30 font-sans hidden md:block">
          PROTOCOL_REF: 7710 // CINEMA
        </div>
        <h1 className="font-serif text-6xl md:text-[10vw] leading-[0.8] tracking-tighter mb-12 italic">
          High-Fidelity<br/>Optics.
        </h1>
        <div className="max-w-3xl font-sans text-sm md:text-lg leading-relaxed opacity-80 mt-12">
          <p className="mb-8 font-medium">
            At OffTime, cinematography is the surgical application of optics. We capture the soul of the sensor with technical perfection.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[10px] tracking-[0.3em] uppercase opacity-40 mt-20 border-t border-white/10 pt-10">
              <div>// ANAMORPHIC_LENSES</div>
              <div>// 12-BIT_LOG_WORKFLOW</div>
              <div>// MOTION_CONTROL_RIGS</div>
              <div>// VIRTUAL_PRODUCTION</div>
              <div>// PIXEL_LEVEL_GRADING</div>
          </div>
        </div>
      </section>

      {/* Cinematic Main image */}
      <section className="w-full h-[70vh] md:h-screen bg-[#0A0A0A] overflow-hidden group relative">
        <Image 
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1920&q=90" 
          alt="Cinema Main" 
          fill
          className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-90 transition-all duration-[3s] ease-out"
        />
        <div className="absolute bottom-10 left-10 z-20 font-serif text-2xl italic opacity-50">
          Fragment // 05
        </div>
      </section>

      {/* Process detail */}
      <section className="py-32 px-8 md:px-16 bg-black flex flex-col items-center">
          <div className="max-w-5xl aspect-video bg-[#111] overflow-hidden group relative">
              <Image 
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600" 
                alt="Camera Rig" 
                fill 
                className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 transition-opacity duration-[2s]"
              />
              <div className="absolute top-10 right-10 text-[10px] tracking-widest uppercase text-white/50">Technical Study // Rigging</div>
          </div>
      </section>

      <section className="py-48 px-8 md:px-16 bg-[#050505] text-center flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-7xl italic mb-16 tracking-tighter">Optic Protocol.</h2>
          <div className="mt-40">
              <a 
                href="/contact" 
                className="inline-block font-sans text-[10px] tracking-[0.5em] uppercase border border-white/20 px-16 py-8 rounded-full hover:bg-white hover:text-black transition-all duration-700"
                data-cursor="view"
              >
                REQUEST_STUDY
              </a>
          </div>
      </section>

      <Footer />
    </main>
  );
}
