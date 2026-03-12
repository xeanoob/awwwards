'use client';

export default function Philosophy() {
  return (
    <section className="relative py-40 md:py-64 px-8 md:px-16 bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full" data-cursor="mask">
        <h2 className="font-serif text-4xl md:text-[6vw] leading-[1.1] tracking-tighter text-white/90">
          We believe in the power of <span className="italic">immersion</span>.
          Our work sits at the intersection of cinema, digital art, and cutting-edge technology.
          We don't build generic websites; we craft <span className="italic">visceral experiences</span>.
        </h2>
      </div>
    </section>
  );
}
