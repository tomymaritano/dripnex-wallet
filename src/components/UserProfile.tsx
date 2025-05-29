import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAccount } from 'wagmi';
import { UserProfile } from '@/types/user';

export function useUserProfile() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', address)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [address]);

  return { profile, loading };
}