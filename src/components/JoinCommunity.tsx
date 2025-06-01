'use client';

import { FaXTwitter, FaDiscord, FaGithub } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import NewsletterCTA from './NewsletterCTA';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function CommunityBanner() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative w-full px-6 py-14 md:py-20 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-2xl text-white shadow-lg overflow-hidden"
    >
      {/* Glow Background */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-white/10 via-transparent to-transparent animate-pulse blur-2xl opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Be part of the movement
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 mb-8 text-base md:text-lg"
        >
          Connect with us on your favorite platform. Stay in the loop, share feedback, and help shape the future of Dripnex.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 mb-10"
        >
          <SocialIcon href="https://x.com" label="Twitter">
            <FaXTwitter size={22} />
          </SocialIcon>
          <SocialIcon href="https://discord.com" label="Discord">
            <FaDiscord size={22} />
          </SocialIcon>
          <SocialIcon href="https://github.com" label="GitHub">
            <FaGithub size={22} />
          </SocialIcon>
        </motion.div>

        <motion.div variants={itemVariants}>
          <NewsletterCTA />
        </motion.div>
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
      whileHover={{
        scale: 1.2,
        rotate: 5,
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
    >
      {children}
    </motion.a>
  );
}