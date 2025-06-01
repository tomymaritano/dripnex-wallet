'use client';
import { useState } from 'react';
import Image from 'next/image';

type Props = {
  address: string;
};

export default function SendReceivePanel({ address }: Props) {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');

  return (
    <div className="rounded-xl border border-white/10 py-4 px-4 backdrop-blur">
      <div className="flex border-b border-gray-700 mb-4">
        {['send', 'receive'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm ${
              activeTab === tab ? 'text-white border-b-2 border-indigo-400' : 'text-gray-500 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab as 'send' | 'receive')}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'send' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Sending simulated');
          }}
          className="space-y-4 text-sm"
        >
          <div>
            <label className="block text-gray-400 mb-1">Recipient Address</label>
            <input
              type="text"
              required
              placeholder="0x..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Amount</label>
            <input
              type="number"
              step="any"
              required
              placeholder="0.1"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-black rounded font-medium transition"
          >
            Confirm Send
          </button>
        </form>
      )}

      {activeTab === 'receive' && (
        <div className="text-sm text-gray-300 text-center">
          <p className="text-gray-400 mb-3">Scan the QR or copy your address:</p>
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
            alt="QR Code"
            width={150}
            height={150}
          />
          <button
            onClick={() => navigator.clipboard.writeText(address)}
            className="text-indigo-400 hover:underline mt-2"
          >
            Copy Address
          </button>
        </div>
      )}
    </div>
  );
}