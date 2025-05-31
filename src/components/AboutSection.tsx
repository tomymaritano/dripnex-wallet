'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="pt-16 pb-12 px-6 text-white max-w-3xl mx-auto text-center">
      <motion.h2
        className="text-4xl font-bold mb-6 tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Introducing Dripnex
      </motion.h2>

      <motion.p
        className="text-gray-300 text-lg leading-relaxed mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Dripnex is a fast, minimal Web3 dashboard designed to give you full control over your on-chain presence.
        It brings together essential tools for managing your wallet, tracking your activity, and understanding your crypto behavior — all in one intuitive interface.
      </motion.p>

      <motion.p
        className="text-gray-400 text-base leading-relaxed mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Whether you're a builder, creator, or collector, Dripnex helps you see the bigger picture — from balances and transactions to NFTs and future AI-powered insights.
        We’re building a space where crypto identity meets clarity and performance.
      </motion.p>

      <motion.p
        className="text-gray-500 text-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Currently focused on Ethereum and testnets. Multi-chain and Beth transactions coming soon.
      </motion.p>
    </section>
  );
}