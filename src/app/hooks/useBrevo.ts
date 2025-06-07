'use client';

import { useState } from 'react';

/**
 * Handle newsletter subscriptions through the `/api/subscribe` endpoint.
 *
 * @returns Object containing the `subscribe` function and loading state.
 */
export function useBrevo() {
  const [loading, setLoading] = useState(false);

  const subscribe = async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) return { success: true, message: '' };

      if (data.message?.toLowerCase().includes('already')) {
        return { success: true, message: 'already_subscribed' };
      }

      return { success: false, message: data.message || 'Subscription failed' };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return { success: false, message: 'Something went wrong' };
    }
  };

  return { subscribe, loading };
}