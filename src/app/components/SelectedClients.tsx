'use client';

import { motion } from 'framer-motion';

const clients = [
  "Vogue", "L'Oréal", "Chanel", "Porsche", "Nike", "BMW", "Cartier", "Dior", "Saint Laurent"
];

export default function SelectedClients() {
  return (
    <section className="relative py-24 md:py-32 bg-black border-t border-white/10 overflow-hidden">
      <div className="px-8 md:px-16 mb-12">
         <h2 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-50 text-white">
            Partners in Time & Perception
          </h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* We map it twice to create an infinite loop effect */}
        {[0, 1].map((set) => (
          <motion.div
            key={set}
            className="flex whitespace-nowrap items-center min-w-max"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {clients.map((client, i) => (
              <div 
                key={i} 
                className="mx-8 md:mx-16 font-serif text-3xl md:text-5xl tracking-tighter text-white opacity-40 hover:opacity-100 hover:italic transition-all duration-500 cursor-default"
              >
                {client}
              </div>
            ))}
          </motion.div>
        ))}
        
        {/* Soft edge gradients for smooth enter/exit */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
