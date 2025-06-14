'use client';

import { useState } from 'react';
import { useCreateProfile } from '@/features/profile/hooks/useCreateProfile';

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

  const createProfile = useCreateProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!username || !email) {
      setError('Name and email are required');
      return;
    }

    setLoading(true);

    try {
      await createProfile.mutateAsync({ username, email, address });
      setSuccess(true);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err);
      setError('Falló la creación del perfil');
    } finally {
      setLoading(false);
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
