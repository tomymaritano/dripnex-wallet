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
        .select(`
          id, username, email, created_at, avatar_url,
          wallets(id, address, chain_id, created_at)
        `)
        .maybeSingle();

      if (profileErr) throw profileErr;

      console.debug('Fetched profile:', data);

      if (!data) {
        setProfile(null);
        return;
      }

      // Filtrar wallets en JS
      const matchedWallet = data.wallets?.find(w => w.address?.toLowerCase() === address.toLowerCase());

      if (matchedWallet) {
        // Si querés, podés guardar el wallet seleccionado también si te sirve
        setProfile({
          ...data,
          wallets: [matchedWallet],
        });
      } else {
        // No se encontró el wallet → setear perfil = null o con wallets vacíos
        setProfile({
          ...data,
          wallets: [],
        });
      }
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
