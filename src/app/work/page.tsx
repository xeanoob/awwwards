import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WebGLImageTrail from '../components/WebGLImageTrail';
import MagneticButton from '../components/MagneticButton';
import Link from 'next/link';

// Extended list of authentic fashion projects
const projects = [
  { id: 1, client: "OFFTIME SS25", title: "KINETIC_SILK", year: "2026", type: "image", url: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&w=800", slug: "kinetic-silk" },
  { id: 2, client: "Saint Laurent", title: "STRUCTURAL_NOIR", year: "2025", type: "image", url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800", slug: "structural-noir" },
  { id: 3, client: "Rick Owens", title: "ATELIER_CHROME", year: "2025", type: "image", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800", slug: "atelier-chrome" },
  { id: 4, client: "Nike Lab", title: "STRETCH_GRAIN", year: "2024", type: "image", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800", slug: "stretch-grain" },
  { id: 5, client: "Vogue France", title: "THE_COUTURE_VOID", year: "2024", type: "image", url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800", slug: "couture-void" },
  { id: 6, client: "Dior", title: "AETHER_DRESS", year: "2024", type: "image", url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800", slug: "kinetic-silk" },
  { id: 7, client: "Celine", title: "LE_NOIR", year: "2023", type: "image", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800", slug: "structural-noir" },
  { id: 8, client: "Cartier", title: "LUX_ECHO", year: "2023", type: "image", url: "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=800", slug: "atelier-chrome" },
];

export default function WorkPage() {
  const portfolioImages = projects.filter(p => p.type === 'image').map(p => p.url);

  return (
    <main className="bg-[#050505] text-[#F5F5F5] min-h-screen relative selection:bg-white selection:text-black">
      <Nav />
      
      {/* Hero Section with WebGL Trail */}
      <section className="relative h-screen flex flex-col justify-center px-8 md:px-16 pointer-events-none z-10 mix-blend-difference overflow-hidden">
        <h1 className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter mb-12 italic text-white uppercase break-words">
          The Archive.
        </h1>
        <p className="max-w-xl font-sans text-sm md:text-base leading-relaxed opacity-80 tracking-widest uppercase text-white">
          A collection of manipulated moments.
          <br /><br />
          <span className="opacity-50 text-[10px]">Move your mouse rapidly to glimpse the past.</span>
        </p>
      </section>

      {/* The WebGL Trail sits behind the text and fills the hero screen */}
      <div className="absolute inset-x-0 top-0 h-screen z-0">
          <WebGLImageTrail images={portfolioImages} />
      </div>

      {/* Full Project Grid */}
      <section className="relative z-20 bg-[#050505] pt-32 pb-48 px-8 md:px-16 border-t border-white/10">
          
          <div className="flex justify-between items-end mb-20 border-b border-white/20 pb-12">
              <h2 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-50">
                  Selected Works Index
              </h2>
              <span className="font-serif text-2xl italic opacity-50">[ {projects.length} Entries ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
              {projects.map((project, i) => (
                  <Link 
                      key={project.id} 
                      href={`/work/${project.slug}`}
                      className={`group flex flex-col cursor-pointer ${i % 2 !== 0 ? 'md:mt-48' : ''}`}
                      data-cursor="view"
                  >
                      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111] mb-8">
                          {project.type === 'video' ? (
                              <video 
                                src={project.url} 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1]"
                              />
                          ) : (
                              <Image 
                                src={project.url} 
                                alt={project.title} 
                                width={800}
                                height={1000}
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1]"
                              />
                          )}
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                              <MagneticButton>
                                  <div className="w-24 h-24 rounded-full border border-white flex items-center justify-center font-sans text-[10px] uppercase tracking-widest backdrop-blur-sm bg-black/10">
                                      View
                                  </div>
                              </MagneticButton>
                          </div>
                      </div>

                      <div className="flex justify-between items-start">
                          <div>
                              <h3 className="font-serif text-3xl md:text-4xl tracking-tighter mb-2 group-hover:italic transition-all duration-300">
                                  {project.title}
                              </h3>
                              <p className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50">
                                  {project.client}
                              </p>
                          </div>
                          <span className="font-sans text-xs opacity-30">{project.year}</span>
                      </div>
                  </Link>
              ))}
          </div>
      </section>

      <Footer />
    </main>
  );
}
