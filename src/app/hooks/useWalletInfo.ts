// src/app/hooks/useWalletInfo.ts

import { useAccount, useBalance } from 'wagmi';

export function useWalletInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  return {
    address,
    isConnected,
    balance: balance?.formatted,
    balanceSymbol: balance?.symbol,
  };
}