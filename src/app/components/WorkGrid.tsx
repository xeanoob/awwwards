'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSound } from './SoundProvider';
import LiquidTransition from './LiquidTransition';

const projects = [
  { id: 1, title: 'Lumina', client: 'Fashion House', videoUrl: '/videos/video1.mp4', span: 'col-span-1 md:col-span-6 row-span-2 aspect-[16/9]' },
  { id: 2, title: 'Echoes', client: 'Automotive', videoUrl: '/videos/video2.mp4', span: 'col-span-1 md:col-span-6 row-span-2 aspect-[4/3] md:translate-y-32' },
  { id: 3, title: 'Aether', client: 'Fragrance', videoUrl: '/videos/video3.mp4', span: 'col-span-1 md:col-span-8 row-span-2 aspect-[21/9]' },
  { id: 4, title: 'Velocity', client: 'Sportswear', videoUrl: '/videos/video4.mp4', span: 'col-span-1 md:col-span-4 row-span-2 aspect-[3/4]' },
  { id: 5, title: 'Noir', client: 'Editorial', videoUrl: '/videos/video5.mp4', span: 'col-span-1 md:col-span-12 aspect-[16/9]' },
];

export default function WorkGrid() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playHeartbeat } = useSound();

  const handleProjectClick = () => {
    playHeartbeat();
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 2500);
  };

  return (
    <>
      <section className="py-40 px-4 md:px-16 mx-auto w-full bg-black">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={handleProjectClick} 
            />
          ))}
        </div>
      </section>

      <LiquidTransition isVisible={isTransitioning} onComplete={() => {}} />
    </>
  );
}

function ProjectCard({ project, index, onClick }: { project: any, index: number, onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playClick } = useSound();

  const handleMouseEnter = () => {
    playClick();
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 1, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group overflow-hidden cursor-pointer ${project.span}`}
      data-cursor="view"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="w-full h-full overflow-hidden bg-[#0A0A0A]">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1.2s] ease-[0.16,1,0.3,1]"
          src={project.videoUrl}
        />
      </div>
      
      {/* Overlay details that appear on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 md:p-12 pointer-events-none">
        <h3 className="font-serif text-4xl md:text-6xl text-white mb-2 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">{project.title}</h3>
        <p className="font-sans text-[10px] md:text-xs text-white uppercase tracking-[0.3em] font-medium opacity-80 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 delay-100 ease-[0.16,1,0.3,1]">{project.client}</p>
      </div>
    </motion.div>
  );
}
