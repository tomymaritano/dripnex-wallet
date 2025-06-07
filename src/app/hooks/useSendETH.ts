'use client';

import { parseEther } from 'viem';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

/**
 * Utility hook to send ETH using `wagmi`'s `useSendTransaction`.
 *
 * @returns State and helper methods for sending ETH transactions.
 */
export function useSendEth() {
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const { address } = useAccount();
  const {
    sendTransaction,
    data,
    isPending,
    error,
    isError,
  } = useSendTransaction();

  const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash!,
    query: { enabled: !!txHash },
  });

  const send = (to: `0x${string}`, amount: string) => {
    sendTransaction(
      {
        to,
        value: parseEther(amount),
      },
      {
        onSuccess: (data) => {
          setTxHash(data);
        },
      }
    );
  };

  return {
    send,
    isPending,
    isSuccess,
    isConfirming,
    isError,
    error,
    txHash,
  };
}