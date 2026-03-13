import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function FilmPage() {
  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      
      {/* Film Hero */}
      <section className="relative pt-40 pb-24 px-8 md:px-16 min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-40 right-8 md:right-16 text-[10px] tracking-[0.5em] uppercase opacity-30 font-sans hidden md:block">
          PROTOCOL_REF: 3392 // FILM
        </div>
        <h1 className="font-serif text-6xl md:text-[10vw] leading-[0.8] tracking-tighter mb-12 italic">
          Cinematic<br/>Distortion.
        </h1>
        <div className="max-w-3xl font-sans text-sm md:text-lg leading-relaxed opacity-80 mt-12">
          <p className="mb-8 font-medium">
            Fashion film at OffTime is the surgical removal of the ordinary. We build worlds that exist only in the shutter&apos;s blink.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[10px] tracking-[0.3em] uppercase opacity-40 mt-20 border-t border-white/10 pt-10">
              <div>{'// RHYTHMIC_EDITING'}</div>
              <div>{'// GLITCH_AESTHETICS'}</div>
              <div>{'// ANAMORPHIC_VISION'}</div>
              <div>{'// MACRO_STUDIES'}</div>
              <div>{'// POST_GRAIN_MAPPING'}</div>
          </div>
        </div>
      </section>

      {/* Cinematic Main image */}
      <section className="w-full h-[70vh] md:h-screen bg-[#0A0A0A] overflow-hidden group relative text-white">
        <video 
          src="https://assets.mixkit.co/videos/23327/23327-720.mp4" 
          autoPlay loop muted playsInline
          className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 group-hover:opacity-70 transition-all duration-[3s] ease-out"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-125 transition-transform duration-700 bg-white/5 backdrop-blur-sm">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[15px] border-l-white border-b-[8px] border-b-transparent ml-1" />
            </div>
        </div>
        <div className="absolute bottom-10 left-10 z-20 font-serif text-2xl italic opacity-50">
          Fragment // 03
        </div>
      </section>

      {/* Detail Grid */}
      <section className="py-32 px-8 md:px-16 bg-black">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
               <div className="md:col-span-5 aspect-square bg-[#111] overflow-hidden">
                   <Image 
                    src="https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=1200" 
                    alt="Film Detail" 
                    width={800} height={800} className="w-full h-full object-cover grayscale opacity-40 hover:opacity-100 transition-opacity duration-1000"
                   />
              </div>
              <div className="md:col-span-7 aspect-[16/9] bg-[#111] overflow-hidden">
                   <Image 
                    src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=1200" 
                    alt="Film Set" 
                    width={1200} height={675} className="w-full h-full object-cover grayscale opacity-40 hover:opacity-100 transition-opacity duration-1000"
                   />
              </div>
          </div>
      </section>

      <section className="py-48 px-8 md:px-16 bg-[#050505] text-center flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-7xl italic mb-16 tracking-tighter">The Shutter Protocol.</h2>
          <div className="mt-40">
              <a 
                href="/contact" 
                className="inline-block font-sans text-[10px] tracking-[0.5em] uppercase border border-white/20 px-16 py-8 rounded-full hover:bg-white hover:text-black transition-all duration-700"
                data-cursor="view"
              >
                REQUEST_FILM_SEQUENCE
              </a>
          </div>
      </section>

      <Footer />
    </main>
  );
}
