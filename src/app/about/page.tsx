import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      
      {/* Intro Hero */}
      <section className="relative pt-40 pb-24 px-8 md:px-16 min-h-[80vh] flex flex-col justify-center">
        <h1 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter mb-12 italic">
          The Illusion of Time.
        </h1>
        <div className="max-w-3xl font-sans text-sm md:text-base leading-relaxed opacity-80 mt-12">
          <p className="mb-6 font-medium text-xl">
            At 1820, we don&apos;t just capture light on a sensor. We manipulate the viewer&apos;s perception of time.
          </p>
          <p className="opacity-70">
            Through meticulous editing, kinetic typography, and fluid digital design, we stretch seconds into profound moments. 
            Established as a boutique production house in Paris, we evolved into a digital avant-garde studio operating globally. 
            Our work sits at the intersection of cinema and interactive art.
          </p>
        </div>
      </section>

      {/* Manifest Image Break */}
      <section className="w-full h-[60vh] md:h-screen bg-[#111] overflow-hidden group">
          <Image 
            src="/images/about.jpg" 
            alt="Studio Manifest" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-[2s]" 
          />
      </section>

      {/* Team / Philosophy Details */}
      <section className="py-32 px-8 md:px-16 flex flex-col md:flex-row gap-20">
          <div className="w-full md:w-1/3">
             <h2 className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-50 sticky top-40">
                Core Directives
             </h2>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col gap-32">
             
             <div>
                 <h3 className="font-serif text-4xl md:text-5xl tracking-tight mb-8 italic">Precision & Chaos</h3>
                 <p className="font-sans text-sm opacity-70 leading-relaxed max-w-xl">
                     We believe that beauty exists on the edge of breaking. Our aesthetic relies on introducing measured amounts of chaos into perfectly structured grids. It is the grain over the digital lens, the RGB split on the pristine 3D model.
                 </p>
             </div>

             <div>
                 <h3 className="font-serif text-4xl md:text-5xl tracking-tight mb-8 italic">Sensory Overload</h3>
                 <p className="font-sans text-sm opacity-70 leading-relaxed max-w-xl">
                     A website should not just be read; it should be felt. By combining heavy sub-bass frequencies, aggressive typography reveals, and fluid cursor mechanics, we force the user to pay attention.
                 </p>
             </div>

          </div>
      </section>

      <Footer />
    </main>
  );
}
