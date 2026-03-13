import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function FilmPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Nav />
      <section className="relative pt-40 pb-24 px-8 md:px-16 min-h-[80vh] flex flex-col justify-center">
        <h1 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter mb-12 italic">
          Fashion Film.
        </h1>
        <div className="max-w-3xl font-sans text-sm md:text-base opacity-80 mt-12">
          <p className="mb-6 font-medium text-xl">Cinematic motion and sensory aesthetics.</p>
          <p className="opacity-70 leading-relaxed">
            Movement is the ultimate expression of the silhouette. Our fashion films combine rhythmic editing with high-end cinematography to create immersive sensory experiences.
          </p>
        </div>
      </section>

      <section className="w-full aspect-video md:aspect-[21/9] bg-[#111] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=1920" 
          alt="Film" 
          width={1920} 
          height={1080} 
          className="w-full h-full object-cover grayscale opacity-50"
        />
      </section>

      <section className="py-32 px-8 md:px-16 text-center">
          <a href="/contact" className="inline-block font-sans text-xs tracking-[0.4em] border border-white/20 px-12 py-6 rounded-full hover:bg-white hover:text-black transition-all duration-500">
            START_SEQUENCE
          </a>
      </section>
      <Footer />
    </main>
  );
}
