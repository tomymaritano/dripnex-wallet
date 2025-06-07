'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrevo } from '@/app/hooks/useBrevo';

/**
 * Newsletter call-to-action with email subscription form.
 */
export default function NewsletterCTA() {
  const { subscribe, loading } = useBrevo();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email.trim());

    if (result.success) {
      setSubmitted(true);
      setAlreadySubscribed(result.message === 'already_subscribed');
      setError('');
    } else {
      setError(result.message);
    }
  };

  return (
    <section className="py-6 px-6 max-w-4xl mx-auto w-full text-white text-center">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-10 shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
        <p className="text-gray-400 mb-6">
          Join our email list to receive occasional updates on Dripnex — new features, dev logs, and launch announcements.
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
              className="bg-green-500/10 text-green-400 border border-green-500/20 rounded-md px-6 py-4 max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold">
                {alreadySubscribed ? "You’re already subscribed!" : "You’re on the list!"}
              </h3>
              <p className="text-sm text-green-300 mt-1">
                {alreadySubscribed
                  ? "Thanks for being part of the Dripnex community."
                  : "Thanks for subscribing. We’ll keep you posted."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 px-4 py-3 rounded-md text-black outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.95, rotate: -5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 rounded-md font-medium"
              >
                {loading ? 'Loading...' : 'Subscribe'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-4"
          >
            {error}
          </motion.p>
        )}
      </div>
    </section>
  );
}