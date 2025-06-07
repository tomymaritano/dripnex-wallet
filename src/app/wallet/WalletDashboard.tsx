'use client';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useUserProfile } from '../hooks/useUserProfile';
import { fetchTransactions, ParsedTransaction } from '@/lib/fetchTransactions';
import ProfileCard from './components/ProfileCard';
import TransactionList from './components/TransactionList';
import SendReceivePanel from './components/SendReceivePanel';
import DonateWidget from './components/DonateWidget';

/**
 * Main dashboard showing wallet info, transactions and donation widget.
 */
export default function WalletDashboard() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({ address });
  const { profile, loading: profileLoading } = useUserProfile(address);
  const [transactions, setTransactions] = useState<ParsedTransaction[]>([]);

  useEffect(() => {
    if (isConnected && address && chainId) {
      supabase.from('wallets').upsert({ address, chain_id: chainId }, { onConflict: 'address' });
    }
  }, [address, chainId, isConnected]);

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
          onEditClick={() => router.push('/profile')} // 🔁 redirige a /profile
        />

        <div className="mt-10">
          <h3 className="text-sm text-gray-400 mb-4">Recent Transactions</h3>
          <TransactionList transactions={transactions} currentAddress={address} />
        </div>
      </div>

      <SendReceivePanel address={address} />
    </div>
    <DonateWidget />
    </>
   
  );
}