import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  // Map slugs to display data
  const projectData: any = {
    'kinetic-silk': {
      title: 'KINETIC_SILK',
      client: 'OFFTIME SS25',
      hero: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&w=1920',
      description: 'A study in gravitational fluidity and sculptural movement.',
      fragments: [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae'
      ]
    },
    'structural-noir': {
      title: 'STRUCTURAL_NOIR',
      client: 'Saint Laurent',
      hero: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1920',
      description: 'Architectural silhouettes defined by extreme contrast and light.',
      fragments: [
        'https://images.unsplash.com/photo-1531123414780-f74242c2b052',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e'
      ]
    },
    'atelier-chrome': {
        title: 'ATELIER_CHROME',
        client: 'Rick Owens',
        hero: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920',
        description: 'Post-industrial tailoring in the heart of the atelier void.',
        fragments: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
          'https://images.unsplash.com/photo-1509631179647-0177331693ae'
        ]
    }
  };

  const project = projectData[params.slug] || projectData['kinetic-silk'];

  return (
    <main className="bg-black text-[#F5F5F5] min-h-screen">
      <Nav />
      {/* Cinematic Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image 
          src={project.hero} 
          alt={project.title} 
          fill 
          className="object-cover grayscale brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <div className="absolute bottom-20 left-8 md:left-16 z-10">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase opacity-50 mb-4 block">Archive_{project.client}</span>
          <h1 className="font-serif text-6xl md:text-[10vw] leading-[0.8] tracking-tighter italic">{project.title}</h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-24 px-8 md:px-16 flex justify-end">
          <div className="max-w-2xl text-right">
              <p className="font-sans text-lg md:text-2xl italic leading-relaxed opacity-80">
                  {project.description}
              </p>
          </div>
      </section>

      {/* Fragments Grid */}
      <section className="py-32 px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.fragments.map((url: string, i: number) => (
             <div key={i} className="aspect-[4/5] bg-[#111] overflow-hidden group">
                 <Image 
                    src={`${url}?auto=format&fit=crop&w=1200`} 
                    alt="Fragment" 
                    width={1000} height={1250} 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
                 />
             </div>
          ))}
      </section>

      <Footer />
    </main>
  );
}
