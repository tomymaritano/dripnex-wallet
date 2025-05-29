// src/hooks/useUserProfile.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface UserProfile {
  id: string;
  address: string;
  created_at: string;
  // podés agregar más campos acá si los tenés en Supabase
}

export function useUserProfile(address?: string | null): {
  profile: UserProfile | null;
  loading: boolean;
} {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('address', address)
        .single();

      if (!error && data) {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [address]);

  return { profile, loading };
}