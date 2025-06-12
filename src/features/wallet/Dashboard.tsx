'use client';

import { useAccount, useChainId } from 'wagmi';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { NETWORKS } from '@/lib/networks';
import { useUserProfile } from '@/app/hooks/useUserProfile';
import { fetchTransactions, ParsedTransaction } from '@/lib/fetchTransactions';
import TransactionList from './components/TransactionList';
import TransferPanel from './components/TransferPanel';
import DonateWidget from './components/DonateWidget';
import WalletList from './components/WalletList';
import WalletInfoCard from '@/components/WalletInfoCard';
import TokenGroup from './components/TokenGroup';
import { useTokenPricesBatch } from '@/lib/hooks/useTokenPricesBatch';


export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
    const { prices } = useTokenPricesBatch();

  const { profile, refetch } = useUserProfile(address);
  const [transactions, setTransactions] = useState<ParsedTransaction[]>([]);

  useEffect(() => {
    if (isConnected && address && chainId && profile) {
      supabase
        .from('wallets')
        .upsert(
          { address, chain_id: chainId, profile_id: profile.id },
          { onConflict: 'address' }
        );
    }
  }, [address, chainId, isConnected, profile]);

  useEffect(() => {
    if (!address || !isConnected) return;
    fetchTransactions(address)
      .then((data) => {
        if (!data.error) {
          setTransactions(data.transactions);
        } else {
          console.error(data.error);
        }
      })
      .catch(console.error);
  }, [address, isConnected]);

  if (!isConnected || !address) return null;

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 py-6 text-white">

        {/* Left column → Wallet Info + WalletList + TokenBalances */}
        <div className="space-y-6 lg:col-span-1">

          <WalletInfoCard />

          {profile && (
            <WalletList profileId={profile.id} wallets={profile.wallets} onChange={refetch} />
          )}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Token Balances</h3>
            {Object.entries(NETWORKS).map(([key, net], index) => (
              <TokenGroup
                key={key}
                networkName={net.name}
                chainId={net.chainId}
                address={address as `0x${string}`}
                tokens={net.tokens}
                prices={prices}
                initiallyOpen={index === 0}  // 👈 solo el primero abierto
              />
            ))}
          </div>

        </div>

        {/* Right column → TransferPanel + Transactions */}
        <div className="space-y-6 lg:col-span-2">

          <div className="rounded-xl border border-white/10 py-4 px-5 backdrop-blur shadow-lg space-y-4">
            <h3 className="text-base font-bold text-white">Transfer Tokens</h3>
            <TransferPanel address={address} />
          </div>

          <div className="rounded-xl border border-white/10 py-4 px-5 backdrop-blur shadow-lg space-y-4">
            <h3 className="text-base font-bold text-white">Recent Transactions</h3>
            <TransactionList transactions={transactions} currentAddress={address} />
          </div>

        </div>
      </div>

      {/* Donate Widget → full width footer */}
      <div className="mt-10">
        <DonateWidget />
      </div>
    </>
  );
}