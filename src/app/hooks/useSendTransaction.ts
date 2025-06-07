'use client'
import { useState } from 'react';
import { parseEther } from 'viem';
import { useEstimateGas, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';

/**
 * Hook to send transactions on any supported network.
 * @param chainId Target network chain ID
 */
export function useSendTransactionWithGas(chainId: number) {
  const [hash, setHash] = useState<`0x${string}` | null>(null);

  const { estimateGasAsync } = useEstimateGas({ chainId });
  const {
    sendTransactionAsync,
    isPending,
    error,
    isError,
  } = useSendTransaction({ chainId });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash!,
    chainId,
    query: { enabled: !!hash },
  });

  const estimate = async (to: `0x${string}`, amount: string) => {
    return estimateGasAsync({ to, value: parseEther(amount) });
  };

  const send = async (to: `0x${string}`, amount: string) => {
    const txHash = await sendTransactionAsync({ to, value: parseEther(amount) });
    setHash(txHash);
    return txHash;
  };

  return {
    estimate,
    send,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
  };
}
