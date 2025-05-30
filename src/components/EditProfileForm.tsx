'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

type Profile = {
  username: string;
  email: string;
  wallet_address: string;
};

type Props = {
  profile: Profile;
};

export default function EditProfileForm({ profile }: Props) {
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ username, email })
      .eq('wallet_address', profile.wallet_address);

    setSaving(false);

    if (updateError) {
      setError('Error al actualizar el perfil.');
      console.error(updateError);
    } else {
      setSuccess(true);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="bg-black/20 p-6 rounded-lg text-white max-w-md mx-auto mt-6 border border-white/10">
      <h2 className="text-2xl font-bold mb-2">✏️ Editar perfil</h2>

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        disabled={saving}
        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 disabled:opacity-50 w-full"
      >
        {saving ? 'Guardando...' : 'Guardar cambios'}
      </button>

      {error && <p className="text-red-400 mt-2">{error}</p>}
      {success && <p className="text-green-400 mt-2">✅ Cambios guardados correctamente</p>}
    </form>
  );
}