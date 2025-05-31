'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  {
    question: 'Is Dripnex free to use?',
    answer: 'Yes. Dripnex is currently free during the early stages of development.',
  },
  {
    question: 'Is it safe to connect my wallet?',
    answer: 'Absolutely. We use secure Web3 standards (Wagmi, MetaMask, WalletConnect) and never request private keys.',
  },
  {
    question: 'Can I use it on mobile?',
    answer: 'Yes, the interface is fully responsive and mobile-ready.',
  },
  {
    question: 'When will NFT support be available?',
    answer: 'It’s in our product roadmap and expected in future updates.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="py-20 px-6 text-white flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition hover:border-indigo-500/40 hover:shadow-lg"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden px-6 pb-4"
                  >
                    <p className="text-sm text-gray-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}