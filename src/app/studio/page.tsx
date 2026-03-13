import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function StudioPage() {
  return (
    <main className="bg-[#050505] text-[#F5F5F5] min-h-screen">
      <Nav />
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 md:px-16 min-h-[60vh] flex flex-col justify-center">
        <h1 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter mb-12 italic">
          The Laboratory.
        </h1>
        <div className="max-w-2xl font-sans text-sm md:text-base leading-relaxed opacity-80 mt-12">
          <p className="mb-6 font-medium text-xl">
            Where perception is engineered.
          </p>
          <p className="opacity-70">
            Our Paris and Tokyo facilities are designed not just as workspaces, but as sensory deprivation tanks where ideas can form in absolute clarity before being unleashed into the world.
          </p>
        </div>
      </section>

      {/* Grid of Studio Images */}
      <section className="py-24 px-8 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="col-span-1 md:col-span-2 aspect-video bg-[#111] overflow-hidden group">
              <Image src="/images/about.jpg" alt="Studio Setup" width={1200} height={800} className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
          </div>

          <div className="col-span-1 aspect-[3/4] md:aspect-auto bg-[#111] overflow-hidden group">
              <Image src="/images/gallery1.jpg" alt="Detail" width={800} height={1200} className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
          </div>

          <div className="col-span-1 aspect-square bg-[#111] overflow-hidden group">
              <Image src="/images/gallery2.jpg" alt="Equipment" width={800} height={800} className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
          </div>

          <div className="col-span-1 md:col-span-2 aspect-[2/1] bg-[#111] overflow-hidden group">
              <video src="/videos/video3.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
          </div>

      </section>

      {/* Philosophy Addendum */}
      <section className="py-32 px-8 md:px-16 text-center max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-5xl italic mb-8">&quot;We control the horizontal.<br/>We control the vertical.&quot;</h2>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-40">Temporal Offset Internal Manifesto</p>
      </section>

      <Footer />
    </main>
  );
}
