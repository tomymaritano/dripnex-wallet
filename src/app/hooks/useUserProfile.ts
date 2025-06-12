// src/app/hooks/useUserProfile.ts

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { UserProfile } from '@/types/user';

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
      const { data: walletData, error: walletErr } = await supabase
        .from('wallets')
        .select('profile_id')
        .eq('address', address.toLowerCase())
        .maybeSingle();

      if (walletErr) throw walletErr;
      if (!walletData) {
        setProfile(null);
        return;
      }
      const { data, error: profileErr } = await supabase
        .from('profiles')
        .select(`
          id, username, name, email, avatar_url, created_at,
          wallets ( id, address, chain_id, created_at, profile_id )
        `)
        .eq('id', walletData.profile_id)
        .limit(1)

        .maybeSingle();

      if (profileErr) throw profileErr;

      console.debug('Fetched wallet+profile:', data);

      if (!data) {
        setProfile(null);
        return;
      }

      setProfile({
        id: data.id,
        username: data.username ?? '',
        name: data.name ?? '',
        email: data.email ?? '',
        avatar_url: data.avatar_url ?? '',
        created_at: data.created_at ?? '',
        wallets: data.wallets?.filter(w => w.address?.toLowerCase() === address.toLowerCase()) ?? [],
      });
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