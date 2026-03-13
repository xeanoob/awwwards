import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function CampaignsPage() {
  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      
      {/* Campaign Hero */}
      <section className="relative pt-40 pb-24 px-8 md:px-16 min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-40 right-8 md:right-16 text-[10px] tracking-[0.5em] uppercase opacity-30 font-sans hidden md:block">
          PROTOCOL_REF: 4410 // CAMPAIGNS
        </div>
        <h1 className="font-serif text-6xl md:text-[10vw] leading-[0.8] tracking-tighter mb-12 italic">
          The Language of<br/>Movement.
        </h1>
        <div className="max-w-3xl font-sans text-sm md:text-lg leading-relaxed opacity-80 mt-12">
          <p className="mb-8 font-medium">
            Campaign direction at OffTime is the orchestration of a brand&apos;s digital pulse. We move beyond static imagery into the kinetic.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[10px] tracking-[0.3em] uppercase opacity-40 mt-20 border-t border-white/10 pt-10">
              <div>{'// BRAND_SYNCHRONIZATION'}</div>
              <div>{'// KINETIC_UI_DIRECTION'}</div>
              <div>{'// SONIC_LANDSCAPING'}</div>
              <div>{'// TEMPORAL_STORYTELLING'}</div>
              <div>{'// GLOBAL_DEPLOYMENT'}</div>
          </div>
        </div>
      </section>

      {/* Cinematic Main image */}
      <section className="w-full h-[70vh] md:h-screen bg-[#0A0A0A] overflow-hidden group relative">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        <Image 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=90" 
          alt="Campaign Main" 
          fill
          className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-90 transition-all duration-[3s] ease-out"
        />
        <div className="absolute bottom-10 left-10 z-20 font-serif text-2xl italic opacity-50">
          Fragment // 02
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-32 px-8 md:px-16 bg-black">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
              <div className="md:col-span-12 aspect-[21/9] bg-[#111] overflow-hidden">
                   <video 
                    src="https://assets.mixkit.co/videos/52270/52270-720.mp4" 
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover grayscale opacity-40 hover:opacity-100 transition-opacity duration-1000"
                   />
              </div>
          </div>
      </section>

      {/* Technical Specs Callout */}
      <section className="py-48 px-8 md:px-16 bg-[#050505] text-center flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-7xl italic mb-16 tracking-tighter">The Global Directive.</h2>
          <div className="max-w-4xl text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-40 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-24 border-y border-white/10 py-20">
              <div className="flex justify-between border-b border-white/5 pb-4">
                  <span>Strategy</span>
                  <span className="text-white opacity-100">Avant-Garde Positioning</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-4">
                  <span>Direction</span>
                  <span className="text-white opacity-100">Multi-Channel Fluidity</span>
              </div>
          </div>

          <div className="mt-40">
              <a 
                href="/contact" 
                className="inline-block font-sans text-[10px] tracking-[0.5em] uppercase border border-white/20 px-16 py-8 rounded-full hover:bg-white hover:text-black transition-all duration-700"
                data-cursor="view"
              >
                INITIATE_CAMPAIGN
              </a>
          </div>
      </section>

      <Footer />
    </main>
  );
}
