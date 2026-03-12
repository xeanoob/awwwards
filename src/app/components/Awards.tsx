'use client';

export default function Awards() {
  const awards = [
    { year: "2026", title: "Awwwards Site of the Month", project: "Lumina" },
    { year: "2025", title: "FWA of the Day", project: "Echoes" },
    { year: "2025", title: "Webby Winner - Best Visual Design", project: "Velocity" },
    { year: "2024", title: "CSS Design Awards - Website of the Year", project: "Aether" },
  ];

  return (
    <section className="relative py-32 md:py-48 px-8 md:px-16 bg-[#050505] text-[#F5F5F5]">
        <div className="max-w-6xl mx-auto">
            
            <div className="pb-16 border-b border-white/20 mb-16">
                <h2 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-50">
                    Industry Recognition
                </h2>
                <h3 className="font-serif text-4xl md:text-5xl tracking-tighter mt-8 italic">
                    Awarded for manipulating time.
                </h3>
            </div>

            <div className="flex flex-col">
                {awards.map((award, i) => (
                    <div 
                        key={i} 
                        className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-white/10 hover:border-white/50 transition-colors"
                        data-cursor="view"
                    >
                        <div className="flex gap-8 items-center font-sans text-xs md:text-sm tracking-widest uppercase mb-4 md:mb-0">
                            <span className="opacity-40 w-12">{award.year}</span>
                            <span className="font-medium opacity-90 group-hover:italic transition-all">{award.title}</span>
                        </div>
                        <div className="font-serif text-xl md:text-2xl tracking-tight opacity-50 group-hover:opacity-100 transition-opacity italic">
                            {award.project}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    </section>
  );
}
