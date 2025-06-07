'use client';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { NETWORKS } from '@/lib/networks';
import { useUserProfile } from '../hooks/useUserProfile';
import { fetchTransactions, ParsedTransaction } from '@/lib/fetchTransactions';
import ProfileCard from './components/ProfileCard';
import TransactionList from './components/TransactionList';
import TransferPanel from './components/TransferPanel';
import DonateWidget from './components/DonateWidget';
import WalletList from './components/WalletList';

function TokenBalance({
  address,
  chainId,
  token,
}: {
  address: `0x${string}`;
  chainId: number;
  token?: { address: `0x${string}`; symbol: string };
}) {
  const { data } = useBalance({
    address,
    chainId,
    token: token?.address,
  });
  return (
    <span>
      {data?.formatted ?? '0'} {token?.symbol ?? ''}
    </span>
  );
}

/**
 * Main dashboard showing wallet info, transactions and donation widget.
 */
export default function Dashboard() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({ address });
  const { profile, loading: profileLoading, refetch } = useUserProfile(address);
  const [transactions, setTransactions] = useState<ParsedTransaction[]>([]);

  useEffect(() => {
    if (isConnected && address && chainId && profile) {
      supabase
        .from('wallets')
        .upsert({ address, chain_id: chainId, profile_id: profile.id }, { onConflict: 'address' });
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
     <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 py-6 text-white">
      <div>
        <ProfileCard
          address={address}
          chainId={chainId}
          balance={balanceData?.formatted}
          profile={profile}
          loading={profileLoading}
          onEditClick={() => router.push('/profile')}
        />

        {profile && (
          <div className="mt-6">
            <WalletList profileId={profile.id} wallets={profile.wallets} onChange={refetch} />
          </div>
        )}

        <div className="mt-10">
          <h3 className="text-sm text-gray-400 mb-4">Recent Transactions</h3>
          <TransactionList transactions={transactions} currentAddress={address} />
        </div>
      </div>

      <TransferPanel address={address} />
    </div>
    <DonateWidget />
    </>

  );
}
