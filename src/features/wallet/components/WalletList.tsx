'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Wallet } from '@/types/user';
import { Loader2, Trash2, Plus } from 'lucide-react'; // íconos, opcional si usás Lucide

interface Props {
  profileId: string;
  wallets: Wallet[];
  onChange: () => void;
}

/**
 * Displays a list of wallet addresses with controls to add or remove them.
 */
export default function WalletList({ profileId, wallets, onChange }: Props) {
  const [newAddress, setNewAddress] = useState('');
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!newAddress) return;
    setAdding(true);
    await supabase.from('wallets').insert({ profile_id: profileId, address: newAddress });
    setAdding(false);
    setNewAddress('');
    onChange();
  };

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    await supabase.from('wallets').delete().eq('id', id);
    setRemovingId(null);
    onChange();
  };

  return (
    <div className="rounded-xl border border-white/10 py-6 px-5 backdrop-blur bg-black/30 shadow-lg space-y-6 text-white">
      <h3 className="text-lg font-semibold tracking-wide">Wallets</h3>

      <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {wallets.map((w) => (
          <li
            key={w.id}
            className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg text-xs backdrop-blur border border-white/10"
          >
            <span className="break-all">{w.address}</span>
            <button
              onClick={() => handleRemove(w.id)}
              className="text-red-400 hover:text-red-300 transition"
              disabled={removingId === w.id}
            >
              {removingId === w.id ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </li>
        ))}
        {wallets.length === 0 && (
          <li className="text-center text-gray-400 text-sm">No wallets linked yet.</li>
        )}
      </ul>

      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="flex-1 px-3 py-2 bg-gray-900 border border-white/10 rounded-md text-white placeholder:text-gray-500 text-xs"
          placeholder="Enter wallet address"
        />
        <button
          onClick={handleAdd}
          disabled={adding || newAddress.trim() === ''}
          className="flex items-center gap-1 bg-teal-500 hover:bg-teal-400 text-black font-semibold px-3 py-2 rounded transition disabled:opacity-50 text-xs"
        >
          {adding ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add
            </>
          )}
        </button>
      </div>
    </div>
  );
}