'use client';

import { useState } from 'react';
import { useUserProfile } from '@/features/profile/hooks/useUserProfile';
import { useUpdateProfile } from '@/features/profile/hooks/useUpdateProfile';
import { useAccount } from 'wagmi';

/**
 * Form that allows a user to update their profile username.
 */
export default function UserProfileForm() {
  const { address } = useAccount();
  const { data: profile, isLoading } = useUserProfile(address);
  const [username, setUsername] = useState(profile?.username || '');
  const updateProfile = useUpdateProfile(profile?.id ?? '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    const { error } = await updateProfile.mutateAsync({ username });
    setMessage(error ? 'Error saving username' : 'Username saved!');
  };

  if (isLoading) return <p>Loading profile...</p>;

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
