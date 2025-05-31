'use client';

import Link from 'next/link';
import { FaXTwitter, FaDiscord, FaGithub } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import NewsletterCTA from './NewsletterCTA';

export default function CommunityBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full px-6 py-12 md:py-16 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-xl text-white shadow-md"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Be part of the movement
        </h2>
        <p className="text-gray-300 mb-6 text-base md:text-lg">
          Connect with us on your favorite platform. Stay in the loop, share feedback, and help shape the future of Dripnex.
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <SocialIcon href="https://x.com" label="Twitter">
            <FaXTwitter size={20} />
          </SocialIcon>
          <SocialIcon href="https://discord.com" label="Discord">
            <FaDiscord size={20} />
          </SocialIcon>
          <SocialIcon href="https://github.com" label="GitHub">
            <FaGithub size={20} />
          </SocialIcon>
        </div>

        {/* 👇 Sección única para Newsletter */}
        <NewsletterCTA />
      </div>
    </motion.section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      aria-label={label}
      whileHover={{ scale: 1.15, rotate: 2 }}
      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
    >
      {children}
    </motion.a>
  );
}