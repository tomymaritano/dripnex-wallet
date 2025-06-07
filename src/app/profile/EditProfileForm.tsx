'use client';

import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

type Profile = {
  id: string;
  username: string;
  email: string;
};

type Props = {
  profile: Profile;
  onCancel?: () => void;
  onSuccess?: () => void;
};

export default function EditProfileForm({ profile, onCancel, onSuccess }: Props) {
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
      .eq('id', profile.id);

    setSaving(false);

    if (updateError) {
      setError('❌ Error al actualizar el perfil.');
      toast.error('❌ Hubo un problema al guardar los cambios.');
      console.error(updateError);
    } else {
      setSuccess(true);
      toast.success('✅ Cambios guardados correctamente');
      onSuccess?.();
    }
  };

  return (
    <motion.form
      onSubmit={handleUpdate}
      className="w-full backdrop-blur-md border border-indigo-500/20 p-6 rounded-2xl shadow-xl space-y-6 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-2xl font-bold text-white flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Editar tu perfil
      </motion.h2>

      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm text-gray-400">
          Nombre de usuario
        </label>
        <motion.input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 w-full bg-black/40 border border-indigo-500/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          whileFocus={{ scale: 1.02 }}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm text-gray-400">
          Email
        </label>
        <motion.input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 w-full bg-black/40 border border-indigo-500/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          whileFocus={{ scale: 1.02 }}
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        {onCancel && (
          <motion.button
            type="button"
            onClick={onCancel}
            className="text-sm text-indigo-400 hover:underline"
            whileHover={{ scale: 1.05 }}
          >
            Cancelar
          </motion.button>
        )}
        <motion.button
          type="submit"
          disabled={saving}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 disabled:opacity-50 transition"
          whileTap={{ scale: 0.95 }}
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            className="text-red-400 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.p>
        )}
        {!error && success && (
          <motion.p
            className="text-green-400 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Cambios guardados correctamente
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
