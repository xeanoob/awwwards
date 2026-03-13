'use client';

import Link from 'next/link';

const services = [
  { name: "Editorial Production", href: "/services/editorial" },
  { name: "Campaign Direction", href: "/services/campaigns" },
  { name: "Fashion Film", href: "/services/film" },
  { name: "Runway Documentation", href: "/services/runway" },
  { name: "High-End Cinematography", href: "/services/cinematography" }
];

export default function Expertise() {
  return (
    <section className="relative py-32 md:py-48 px-8 md:px-16 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="w-full md:w-1/3">
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase opacity-50 mb-8">Our Focus</h2>
          <p className="font-serif text-3xl md:text-5xl italic leading-tight">Elevating fashion through technical precision.</p>
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col gap-4 md:gap-8">
          {services.map((service, i) => (
            <Link key={i} href={service.href} className="group flex justify-between items-center border-b border-white/10 pb-6 md:pb-8 cursor-pointer" data-cursor="view">
              <span className="font-serif text-3xl md:text-5xl tracking-tighter group-hover:italic transition-all duration-500">{service.name}</span>
              <span className="font-sans text-[10px] md:text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-24 md:mt-32 flex justify-center md:justify-end max-w-7xl mx-auto px-8">
          <a 
            href="/contact" 
            className="group flex items-center gap-6 font-sans text-xs tracking-[0.4em] uppercase opacity-50 hover:opacity-100 transition-all duration-500"
            data-cursor="view"
          >
            <span>[ BOOK_A_SESSION ]</span>
            <div className="w-12 h-[1px] bg-white transform origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
          </a>
      </div>
    </section>
  );
}
