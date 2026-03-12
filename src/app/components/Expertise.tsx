'use client';

const services = [
  "Creative Direction",
  "Film Production",
  "Sound Design",
  "WebGL & 3D Experiences",
  "Immersive Digital Platforms"
];

export default function Expertise() {
  return (
    <section className="relative py-32 md:py-48 px-8 md:px-16 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="w-full md:w-1/3">
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase opacity-50 mb-8">Our Expertise</h2>
          <p className="font-serif text-3xl md:text-5xl italic leading-tight">A holistic approach to visual storytelling.</p>
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col gap-4 md:gap-8">
          {services.map((service, i) => (
            <div key={i} className="group flex justify-between items-center border-b border-white/10 pb-6 md:pb-8 cursor-pointer" data-cursor="view">
              <span className="font-serif text-3xl md:text-5xl tracking-tighter group-hover:italic transition-all duration-500">{service}</span>
              <span className="font-sans text-[10px] md:text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
