'use client';

export default function Footer() {
  return (
    <footer className="bg-black pt-40 pb-10 px-8 md:px-16 border-t border-white/10 mt-32 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col justify-between h-full relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-40 gap-16">
          <div className="max-w-xl">
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter mb-8 cursor-pointer hover:opacity-70 transition-opacity" data-cursor="view">
              Let's create<br />something iconic.
            </h2>
            <div className="w-full h-px bg-white/20 mb-8" />
            <button className="text-xs font-sans tracking-[0.3em] uppercase py-4 px-8 border border-white hover:bg-white hover:text-black transition-colors duration-500">
              Start a Project
            </button>
          </div>

          <div className="flex gap-16 text-xs font-sans uppercase tracking-[0.2em] opacity-80">
            <div className="flex flex-col gap-4">
              <span className="opacity-50 mb-4">Socials</span>
              <a href="#" className="hover:opacity-50 transition-opacity">Instagram</a>
              <a href="#" className="hover:opacity-50 transition-opacity">Vimeo</a>
              <a href="#" className="hover:opacity-50 transition-opacity">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="opacity-50 mb-4">Offices</span>
              <p>Paris</p>
              <p>Los Angeles</p>
            </div>
          </div>
        </div>

        {/* Bottom Giant Text */}
        <div className="w-full flex justify-center items-center overflow-hidden mb-10">
          <h1 className="text-[20vw] font-serif leading-none tracking-tighter text-white/5 select-none pointer-events-none">
            1820PROD
          </h1>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-sans tracking-widest uppercase opacity-40">
          <p>© {new Date().getFullYear()} 1820 Productions. All rights reserved.</p>
          <p>Cinematic Minimalist Design</p>
        </div>

      </div>
    </footer>
  );
}
