'use client';

import { Contact } from '@/types/user';

interface Props {
  contacts: Contact[];
  onSelect: (address: string) => void;
}

/**
 * Dropdown to choose a saved contact.
 */
export default function ContactSelector({ contacts, onSelect }: Props) {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded-md text-white text-sm"
      defaultValue=""
    >
      <option value="" disabled>
        Select contact
      </option>
      {contacts.map((c) => (
        <option key={c.id} value={c.address}>
          {c.name ? `${c.name} - ${c.address}` : c.address}
        </option>
      ))}
    </select>
  );
}
