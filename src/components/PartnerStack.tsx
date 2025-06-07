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

/**
 * Showcases technologies used in the project.
 */
export default function TechStackShowcase() {
  return (
    <section className="relative py-20 px-6 max-w-6xl mx-auto text-white overflow-hidden">
      <h2 className="text-4xl font-bold mb-4 text-center">
        Powered by Leading Tech
      </h2>
      <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto text-sm sm:text-base">
        Dripnex is built with modern, scalable technologies trusted by the Web3 community.
      </p>

      {/* 👇 Grid en mobile y tablet */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:hidden">
        {tech.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center text-center backdrop-blur-sm"
          >
            <Icon size={24} className="text-indigo-400 mb-2" />
            <span className="text-xs text-gray-300">{name}</span>
          </div>
        ))}
      </div>

      {/* 👇 Marquee solo en desktop */}
      <div className="hidden lg:block relative mt-10">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="overflow-hidden">
          <div className="flex animate-marquee space-x-6 w-max">
            {[...tech, ...tech].map(({ name, icon: Icon }, i) => (
              <div
                key={`${name}-${i}`}
                className="group bg-white/5 hover:bg-indigo-500/10 border border-white/10 rounded-2xl p-5 w-[160px] transition-shadow shadow-sm hover:shadow-lg backdrop-blur-sm flex flex-col items-center gap-2"
              >
                <Icon size={36} className="text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm text-center text-gray-200 mt-1">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}