'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Contact } from '@/types/user';

interface Props {
  profileId: string;
  contacts: Contact[];
  onChange: () => void;
}

/**
 * Displays and manages a list of saved contacts.
 */
export default function ContactList({ profileId, contacts, onChange }: Props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!address) return;
    setAdding(true);
    await supabase
      .from('contacts')
      .insert({ profile_id: profileId, address, name });
    setAdding(false);
    setName('');
    setAddress('');
    onChange();
  };

  const handleRemove = async (id: string) => {
    await supabase.from('contacts').delete().eq('id', id);
    onChange();
  };

  return (
    <div className="space-y-4 text-sm text-white">
      <h3 className="font-semibold">Contacts</h3>
      <ul className="space-y-2">
        {contacts.map((c) => (
          <li key={c.id} className="flex items-center gap-2">
            <span className="flex-1 break-all text-xs bg-white/10 px-2 py-1 rounded">
              {c.name ? `${c.name} - ${c.address}` : c.address}
            </span>
            <button
              onClick={() => handleRemove(c.id)}
              className="text-red-400 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-1 text-black rounded text-xs"
          placeholder="Name (optional)"
        />
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 p-1 text-black rounded text-xs"
            placeholder="0x..."
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
    </div>
  );
}
