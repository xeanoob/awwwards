'use client';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSound } from '../components/SoundProvider';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { playClick } = useSound();

  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      
      <section className="relative pt-40 pb-24 px-8 md:px-16 min-h-screen flex flex-col md:flex-row justify-between gap-20">
        
        {/* Left Column: Text & Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div className="mb-16 md:mb-0">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="font-serif text-6xl md:text-[8vw] leading-[0.85] tracking-tighter mb-8 italic"
                >
                  Get in touch.
                </motion.h1>
                <p className="font-sans text-sm tracking-[0.2em] uppercase opacity-60 mb-12">
                  Let&apos;s distort reality together.
                </p>

                <div className="flex gap-4 mb-20">
                  <a href="mailto:hello@1820.studio" className="border border-white/20 px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors" data-cursor="view" onClick={playClick}>
                      hello@1820.studio
                  </a>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-16">
                <div>
                  <h3 className="font-sans text-[10px] uppercase tracking-widest opacity-40 mb-2">Paris HQ</h3>
                  <p className="font-serif text-xl italic opacity-80 leading-snug">14 Rue de l&apos;Illusion<br/>75003 Paris, France</p>
                </div>
                <div>
                  <h3 className="font-sans text-[10px] uppercase tracking-widest opacity-40 mb-2">Tokyo Labs</h3>
                  <p className="font-serif text-xl italic opacity-80 leading-snug">Shibuya Scramble<br/>150-0002 Tokyo, Japan</p>
                </div>
            </div>
        </div>

        {/* Right Column: Minimalist Form */}
        <div className="w-full md:w-1/2 flex items-center">
            <form className="w-full max-w-lg flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
                
                <div className="relative group">
                    <input 
                      type="text" 
                      id="name" 
                      placeholder=" "
                      className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-sm focus:outline-none focus:border-white transition-colors peer"
                      required
                    />
                    <label htmlFor="name" className="absolute left-0 top-4 font-sans text-[10px] uppercase tracking-widest opacity-50 peer-focus:-top-4 peer-focus:text-[8px] peer-valid:-top-4 peer-valid:text-[8px] transition-all cursor-text pointer-events-none">
                        Your Name
                    </label>
                </div>

                <div className="relative group">
                    <input 
                      type="email" 
                      id="email" 
                      placeholder=" "
                      className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-sm focus:outline-none focus:border-white transition-colors peer"
                      required
                    />
                    <label htmlFor="email" className="absolute left-0 top-4 font-sans text-[10px] uppercase tracking-widest opacity-50 peer-focus:-top-4 peer-focus:text-[8px] peer-valid:-top-4 peer-valid:text-[8px] transition-all cursor-text pointer-events-none">
                        Your Email
                    </label>
                </div>

                <div className="relative group">
                    <textarea 
                      id="message" 
                      placeholder=" "
                      rows={4}
                      className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-sm focus:outline-none focus:border-white transition-colors peer resize-none"
                      required
                    />
                    <label htmlFor="message" className="absolute left-0 top-4 font-sans text-[10px] uppercase tracking-widest opacity-50 peer-focus:-top-4 peer-focus:text-[8px] peer-valid:-top-4 peer-valid:text-[8px] transition-all cursor-text pointer-events-none">
                        Tell us about the project
                    </label>
                </div>

                <button 
                  type="submit" 
                  className="self-start mt-8 border border-white/20 px-12 py-5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:scale-105"
                  onClick={playClick}
                  data-cursor="view"
                >
                    Initiate Sequence
                </button>

            </form>
        </div>

      </section>

      <Footer />
    </main>
  );
}
