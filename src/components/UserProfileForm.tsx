'use client';

import { useState } from 'react';
import { useUserProfile } from '@/app/hooks/useUserProfile';
import { useAccount } from 'wagmi';
import { supabase } from '@/lib/supabaseClient';

/**
 * Form that allows a user to update their profile username.
 */
export default function UserProfileForm() {
  const { address } = useAccount();
  const { profile, loading } = useUserProfile(address);
  const [username, setUsername] = useState(profile?.username || '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({ wallet_address: address, username }, { onConflict: 'wallet_address' });

    setMessage(error ? 'Error saving username' : 'Username saved!');
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-black/30 p-6 rounded-lg border border-gray-700 text-white">
      <h2 className="text-xl font-semibold">Set Your Username</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
        placeholder="Enter username"
      />
      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}