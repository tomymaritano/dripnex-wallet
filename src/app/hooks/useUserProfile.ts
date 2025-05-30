// src/app/hooks/useUserProfile.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { UserProfile } from '@/types/user';

export function useUserProfile(address?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', address)
          .maybeSingle(); // ✅ Esto maneja el caso de 0 resultados

        if (error) throw error;
        setProfile(data ?? null);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Could not fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [address]);

  return { profile, loading, error };
}