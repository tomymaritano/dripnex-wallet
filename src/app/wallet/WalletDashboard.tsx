'use client';

import { useAccount, useBalance, useChainId } from 'wagmi';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUserProfile } from '../hooks/useUserProfile';
import EditProfileForm from '@/components/EditProfileForm';
import { FaArrowDown, FaArrowUp, FaEdit, FaRegCopy, FaSignOutAlt } from 'react-icons/fa';
import { fetchTransactions } from '@/lib/fetchTransactions';

export default function WalletDashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData, isLoading } = useBalance({ address });
  const { profile, loading: profileLoading } = useUserProfile(address);
  const [showEdit, setShowEdit] = useState(false);
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const saveWallet = async () => {
      if (!address || !chainId) return;
      await supabase
        .from('wallets')
        .upsert({ address, chain_id: chainId }, { onConflict: 'address' });
    };

    if (isConnected) {
      saveWallet();
    }
  }, [address, chainId, isConnected]);

  useEffect(() => {
    const getTxs = async () => {
      if (!address) return;
      try {
        const txs = await fetchTransactions(address);
        setTransactions(txs);
      } catch (err) {
        console.error('Error fetching transactions', err);
      }
    };

    if (isConnected) {
      getTxs();
    }
  }, [address, isConnected]);

  if (!isConnected) return null;

  const iconClass = 'w-4 h-4 text-gray-400 hover:text-white transition';

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 py-6 text-white">
      {/* Left Column: Profile and Info */}
      <div>
        {profileLoading ? (
          <p className="text-gray-400">Loading profile...</p>
        ) : profile ? (
          <>
            <div className="mb-6 p-4 rounded-lg border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-300 flex items-center justify-center text-black font-bold text-lg">
                {profile.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-white">{profile.username || 'Anonymous'}</p>
                <p className="text-xs text-gray-400">
                  Joined on {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setShowEdit((prev) => !prev)}
                className="p-2 rounded-md hover:bg-white/10 transition"
                title={showEdit ? 'Close Edit' : 'Edit Profile'}
              >
                <FaEdit className={iconClass} />
              </button>
            </div>
            {showEdit && (
              <div className="mt-4">
                <EditProfileForm profile={profile} />
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-red-500">No profile found.</p>
        )}

        <div className="space-y-4 text-sm text-gray-300 mt-6">
          <div>
            <span className="block text-xs uppercase text-gray-500 mb-1">Address</span>
            <div className="flex items-center gap-2">
              <span className="break-all">{address}</span>
              <button
                onClick={() => navigator.clipboard.writeText(address!)}
                className="hover:text-white"
                title="Copy Address"
              >
                <FaRegCopy className={iconClass} />
              </button>
            </div>
          </div>
          <div>
            <span className="block text-xs uppercase text-gray-500 mb-1">Chain ID</span>
            {chainId}
          </div>
          <div>
            <span className="block text-xs uppercase text-gray-500 mb-1">Balance</span>
            {isLoading ? 'Loading...' : `${balanceData?.formatted} ${balanceData?.symbol}`}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm text-gray-400 mb-4">Recent Transactions</h3>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent transactions.</p>
          ) : (
            <ul className="space-y-3 text-sm text-gray-300">
              {transactions.slice(0, 5).map((tx) => (
                <li
                  key={tx.hash}
                  className="flex justify-between items-center border border-white/5 px-4 py-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    {tx.from.toLowerCase() === address?.toLowerCase() ? (
                      <FaArrowUp className="text-red-400 w-4 h-4" />
                    ) : (
                      <FaArrowDown className="text-green-400 w-4 h-4" />
                    )}
                    <div>
                      <p className="font-medium truncate max-w-[180px]">
                        {tx.value} ETH
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(tx.hash)}
                    title="Copy Tx Hash"
                  >
                    <FaRegCopy className={iconClass} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="mt-10 flex items-center gap-2 text-sm text-red-400 hover:text-white hover:underline transition"
          onClick={() => window.location.reload()}
        >
          <FaSignOutAlt className="w-4 h-4" /> Disconnect Wallet
        </button>
      </div>

      {/* Right Column: Send / Receive */}
      <div className="rounded-xl border border-white/10 py-4 px-4 backdrop-blur">
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`px-4 py-2 text-sm ${
              activeTab === 'send' ? 'text-white border-b-2 border-indigo-400' : 'text-gray-500 hover:text-white'
            }`}
            onClick={() => setActiveTab('send')}
          >
            Send
          </button>
          <button
            className={`px-4 py-2 text-sm ${
              activeTab === 'receive' ? 'text-white border-b-2 border-indigo-400' : 'text-gray-500 hover:text-white'
            }`}
            onClick={() => setActiveTab('receive')}
          >
            Receive
          </button>
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
          <div className="text-sm text-gray-300">
            <p className="text-gray-400 mb-3">Scan the QR or copy your address:</p>
            <div className="flex flex-col items-center gap-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
                alt="QR Code"
              />
              <button
                onClick={() => navigator.clipboard.writeText(address!)}
                className="text-indigo-400 hover:underline mt-2"
              >
                Copy Address
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
