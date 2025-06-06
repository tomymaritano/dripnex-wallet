'use client';

import { motion } from 'framer-motion';

const roadmap = [
  {
    title: 'Wallet connection & profile setup',
    description: 'Users can connect wallets, manage basic info, and view ETH balance and transactions.',
    date: 'May 2025',
  },
  {
    title: 'Token sending (ETH)',
    description: 'Ability to send ETH (ETH) directly from the dashboard.',
    date: 'Coming Soon',
  },
  {
    title: 'AI-powered insights',
    description: 'Covalent AI Agent integration for smart wallet analysis.',
    date: 'Planned',
  },
  {
    title: 'NFT visualization',
    description: 'Dedicated space for NFTs, including filters and chain support.',
    date: 'Planned',
  },
];

export default function RoadmapTimeline() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto text-white">
      <h2 className="text-4xl font-bold mb-4 text-center">Product Roadmap</h2>
      <p className="text-center text-gray-400 mb-12">
        A clear path of where Dripnex is heading. Stay tuned as we continue to build and release new features.
      </p>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/10" />

        <div className="space-y-20">
          {roadmap.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex items-start ${
                  isLeft ? 'justify-start pr-8' : 'justify-end pl-8'
                }`}
              >
                {/* Dot with subtle animation */}
                <motion.div
                  className="absolute left-1/2 top-2 transform -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full border-2 border-white/20 z-10"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(99,102,241,0.5)',
                      '0 0 10px rgba(99,102,241,0.8)',
                      '0 0 0px rgba(99,102,241,0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Content Box */}
                <div
                  className={`w-1/2 text-sm ${
                    isLeft ? 'text-right pr-6' : 'text-left pl-6'
                  }`}
                >
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-gray-400 mt-1">{step.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}