'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

    // Verificamos si ya existe un perfil para esa wallet
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('wallet_address', address)
      .single();

    if (fetchError) {
      console.error('Error fetching existing profile:', fetchError);
    }

    if (existingProfile) {
      setError('Ya existe un perfil con esta wallet.');
      setLoading(false);
      return;
    }

    // Si no existe, lo creamos
    const { error: insertError } = await supabase
      .from('profiles')
        .upsert(
          { wallet_address: address, username, email },
        { onConflict: 'wallet_address' }
      );

    setLoading(false);

    if (insertError) {
      setError('Falló la creación del perfil');
      console.error(insertError);
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