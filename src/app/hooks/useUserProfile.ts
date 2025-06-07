// src/app/hooks/useUserProfile.ts
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { UserProfile } from '@/types/user';

/**
 * Load a user profile from the `profiles` table using Supabase.
 *
 * @param address Wallet address to fetch.
 * @returns Profile data, loading flag, error message and a refetch function.
 */
export function useUserProfile(address?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', address)
        .maybeSingle();

      if (error) throw error;
      setProfile(data ?? null);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Could not fetch profile.');
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}