// src/app/wallet/WalletDashboard.tsx
'use client';

import { useAccount, useBalance, useChainId } from 'wagmi';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUserProfile } from '../hooks/useUserProfile';

export default function WalletDashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData, isLoading } = useBalance({ address });
  const { profile, loading: profileLoading } = useUserProfile(address);

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

  if (!isConnected) return null;

  return (
    <div className="mt-8 p-6 border border-white/10 rounded-xl bg-black/40 text-white">
      <h2 className="text-xl font-medium mb-4">Wallet Overview</h2>

      {profileLoading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <p className="mb-2">
          Welcome! Wallet registered on{' '}
          {new Date(profile.created_at).toLocaleDateString()}
        </p>
      ) : (
        <p className="mb-2 text-red-400">Profile not found</p>
      )}

      <p className="text-teal-400 mb-2 text-sm break-all">Address: {address}</p>
      <p className="text-gray-300 text-sm">Chain ID: {chainId}</p>
      <p className="text-gray-300 text-sm">
        Balance: {isLoading ? 'Loading...' : `${balanceData?.formatted} ${balanceData?.symbol}`}
      </p>
    </div>
  );
}