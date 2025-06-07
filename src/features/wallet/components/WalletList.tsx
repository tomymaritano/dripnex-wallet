'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Wallet } from '@/types/user';

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

  const handleAdd = async () => {
    if (!newAddress) return;
    setAdding(true);
    await supabase.from('wallets').insert({ profile_id: profileId, address: newAddress });
    setAdding(false);
    setNewAddress('');
    onChange();
  };

  const handleRemove = async (id: string) => {
    await supabase.from('wallets').delete().eq('id', id);
    onChange();
  };

  return (
    <div className="space-y-4 text-sm text-white">
      <h3 className="font-semibold">Wallets</h3>
      <ul className="space-y-2">
        {wallets.map((w) => (
          <li key={w.id} className="flex items-center gap-2">
            <span className="flex-1 break-all text-xs bg-white/10 px-2 py-1 rounded">
              {w.address}
            </span>
            <button
              onClick={() => handleRemove(w.id)}
              className="text-red-400 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="flex-1 p-1 text-black rounded text-xs"
          placeholder="New address"
        />
        <button
          onClick={handleAdd}
          disabled={adding}
          className="bg-teal-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}
