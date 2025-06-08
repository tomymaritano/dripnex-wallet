// src/app/hooks/useUserProfile.ts
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { UserProfile } from '@/types/user';

/**
 * Load a user profile and wallet list from Supabase using a wallet address.
 *
 * @param address Wallet address used to look up the profile.
 * @returns Profile data, loading flag, error message and a refetch function.
 */
export function useUserProfile(address?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!address) {
      setProfile(null);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { data, error: profileErr } = await supabase
        .from('profiles')
        .select('*, wallets(id, address, chain_id, created_at)')
        .eq('wallets.address', address)
        .maybeSingle();

      if (profileErr) throw profileErr;
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