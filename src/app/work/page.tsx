import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WebGLImageTrail from '../components/WebGLImageTrail';
import MagneticButton from '../components/MagneticButton';
import Image from 'next/image';

// Extended list of fake projects
const projects = [
  { id: 1, client: "Vogue", title: "Midnight Sun", year: "2026", type: "video", url: "/videos/video1.mp4" },
  { id: 2, client: "Porsche", title: "Velocity", year: "2025", type: "image", url: "/images/gallery1.jpg" },
  { id: 3, client: "Nike", title: "Atmos", year: "2025", type: "video", url: "/videos/video2.mp4" },
  { id: 4, client: "L'Oréal", title: "Radiance", year: "2024", type: "image", url: "/images/gallery2.jpg" },
  { id: 5, client: "Chanel", title: "Echoes", year: "2024", type: "video", url: "/videos/video3.mp4" },
  { id: 6, client: "Dior", title: "Aether", year: "2024", type: "image", url: "/images/about.jpg" },
  { id: 7, client: "Saint Laurent", title: "Noir", year: "2023", type: "image", url: "/images/gallery1.jpg" },
  { id: 8, client: "Cartier", title: "Timeless", year: "2023", type: "video", url: "/videos/video1.mp4" },
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
                  <div 
                      key={project.id} 
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
                                      Play
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
                  </div>
              ))}
          </div>
      </section>

      <Footer />
    </main>
  );
}
