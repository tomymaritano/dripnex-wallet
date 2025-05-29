// src/components/CreateProfileForm.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CreateProfileForm({ address }: { address: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('profiles').insert({ address, name, email });
    window.location.reload(); // o redirect a dashboard
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black/20 p-4 rounded-lg text-white">
      <h2 className="text-lg font-bold mb-2">Create your profile</h2>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 p-2 w-full bg-black/50 border border-gray-600 rounded"
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 w-full bg-black/50 border border-gray-600 rounded"
      />
      <button
        type="submit"
        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Save Profile
      </button>
    </form>
  );
}