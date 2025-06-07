'use client';

import { parseEther } from 'viem';
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export function useSendEth() {
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const { address } = useAccount();
  const {
    sendTransactionAsync,
    isPending,
    error,
    isError,
  } = useSendTransaction();

  const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash!,
    query: { enabled: !!txHash },
  });

  const send = async (to: `0x${string}`, amount: string) => {
    try {
      const tx = await sendTransactionAsync({
        to,
        value: parseEther(amount),
      });
      setTxHash(tx);
      toast.success('✅ Transaction submitted');
      return tx;
    } catch (err) {
      toast.error('❌ Transaction failed');
      throw err;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('✅ Transaction confirmed');
    }
  }, [isSuccess]);

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