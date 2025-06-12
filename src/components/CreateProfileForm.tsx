'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

/**
 * Simple form for creating a user profile associated with a wallet.
 *
 * @param address Wallet address being registered.
 */
export default function CreateProfileForm({ address }: { address: string }) {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!username || !email) {
      setError('Name and email are required');
      return;
    }

    setLoading(true);

    // Check if wallet already linked to a profile
    const { data: existingWallet, error: fetchError } = await supabase
      .from('wallets')
      .select('id')
      .eq('address', address)
      .limit(1)

      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching existing wallet:', fetchError);
    }

    if (existingWallet) {
      setError('Ya existe un perfil con esta wallet.');
      setLoading(false);
      return;
    }

    // Create profile and link wallet
    const { data: profileData, error: profileErr } = await supabase
      .from('profiles')
      .insert({ username, email })
      .select('id')
      .single();

    if (profileErr || !profileData) {
      setLoading(false);
      setError('Falló la creación del perfil');
      console.error(profileErr);
      return;
    }

    const { error: walletErr } = await supabase
      .from('wallets')
      .insert({ profile_id: profileData.id, address });

    setLoading(false);

    if (walletErr) {
      setError('Falló la creación del perfil');
      console.error(walletErr);
    } else {
      setSuccess(true);
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="bg-black/20 p-6 rounded-lg text-white max-w-md mx-auto mt-10 border border-white/10">
      <h2 className="text-2xl font-bold mb-2">👤 Crear perfil</h2>
      <p className="text-gray-400 mb-4">
        Para visualizar tus activos y acceder al dashboard, creá una cuenta básica vinculada a tu wallet.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-2 p-2 w-full bg-black/50 border border-gray-600 rounded placeholder-gray-500"
        />

        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 w-full bg-black/50 border border-gray-600 rounded placeholder-gray-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 disabled:opacity-50 w-full"
        >
          {loading ? 'Guardando...' : 'Crear cuenta'}
        </button>

        {error && <p className="text-red-400 mt-2">{error}</p>}
        {success && <p className="text-green-400 mt-2">✅ Perfil creado exitosamente</p>}
      </form>
    </div>
  );
}
