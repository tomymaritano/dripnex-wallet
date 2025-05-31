'use client';

import {
  SiEthereum,
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiReact,
} from 'react-icons/si';

const tech = [
  { name: 'Ethereum', icon: SiEthereum },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Supabase', icon: SiSupabase },
  { name: 'React', icon: SiReact },
];

export default function TechStackShowcase() {
  return (
    <section className="relative py-24 px-6 max-w-full mx-auto text-white overflow-hidden">
      <h2 className="text-4xl font-bold mb-4 text-center">Powered by Leading Tech</h2>
      <p className="text-gray-400 text-center mb-16">
        Dripnex is built with modern, reliable and scalable technologies trusted by the Web3 community.
      </p>

      {/* Degradado lateral */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#070707] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#070707] to-transparent z-10 pointer-events-none" />

      {/* Marquesina */}
      <div className="overflow-hidden">
        <div className="flex animate-marquee space-x-6 w-max">
          {[...tech, ...tech].map(({ name, icon: Icon }, i) => (
            <div
              key={`${name}-${i}`}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 w-[160px] transition-shadow shadow-sm hover:shadow-lg backdrop-blur-sm flex flex-col items-center gap-2"
            >
              <Icon size={38} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-center text-gray-200 mt-1">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}