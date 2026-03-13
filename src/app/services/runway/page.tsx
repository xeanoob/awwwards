import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function RunwayPage() {
  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      
      {/* Runway Hero */}
      <section className="relative pt-40 pb-24 px-8 md:px-16 min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-40 right-8 md:right-16 text-[10px] tracking-[0.5em] uppercase opacity-30 font-sans hidden md:block">
          PROTOCOL_REF: 9912 // RUNWAY
        </div>
        <h1 className="font-serif text-6xl md:text-[10vw] leading-[0.8] tracking-tighter mb-12 italic">
          The Temporary<br/>Cathedral.
        </h1>
        <div className="max-w-3xl font-sans text-sm md:text-lg leading-relaxed opacity-80 mt-12">
          <p className="mb-8 font-medium">
            Runway documentation is the archival capture of the ephemeral. At OffTime, we document the split-second tension of the walk.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[10px] tracking-[0.3em] uppercase opacity-40 mt-20 border-t border-white/10 pt-10">
              <div>{'// MULTI_ANGLE_COVERAGE'}</div>
              <div>{'// LIVE_REVERSE_FEEDS'}</div>
              <div>{'// HIGH_SPEED_STUDIES'}</div>
              <div>{'// MACRO_FABRIC_PULLS'}</div>
              <div>{'// RAPID_POST_EDITS'}</div>
          </div>
        </div>
      </section>

      <section className="w-full h-[70vh] md:h-[120vh] bg-black grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="relative overflow-hidden group">
               <Image 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200" 
                alt="Runway 01" 
                fill
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
               />
           </div>
           <div className="relative overflow-hidden group">
               <Image 
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200" 
                alt="Runway 02" 
                fill
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
               />
           </div>
      </section>

      <section className="py-48 px-8 md:px-16 bg-[#050505] text-center flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-7xl italic mb-16 tracking-tighter">Ephemeral Archive.</h2>
          <div className="mt-40">
              <a 
                href="/contact" 
                className="inline-block font-sans text-[10px] tracking-[0.5em] uppercase border border-white/20 px-16 py-8 rounded-full hover:bg-white hover:text-black transition-all duration-700"
                data-cursor="view"
              >
                DOCUMENT_RUNWAY
              </a>
          </div>
      </section>

      <Footer />
    </main>
  );
}
