'use client';

import { parseEther, formatEther } from 'viem';
import {
  useSendTransaction as wagmiUseSendTransaction,
  useWaitForTransactionReceipt,
  useEstimateGas,
  useFeeData,
} from 'wagmi';
import { useState, useMemo } from 'react';

export function useSendTransaction(
  chainId: number,
  to?: `0x${string}`,
  amount?: string
) {
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);

  const { sendTransaction, isPending, error, isError } = wagmiUseSendTransaction({
    chainId,
  });

  const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash!,
    chainId,
    query: { enabled: !!txHash },
  });

  const { data: gasEstimate } = useEstimateGas({
    chainId,
    to,
    value: amount ? parseEther(amount) : undefined,
    query: { enabled: !!to && !!amount },
  });

  const { data: feeData } = useFeeData({ chainId });

  const estimatedFee = useMemo(() => {
    if (!gasEstimate || !feeData?.gasPrice) return null;
    return formatEther(gasEstimate * feeData.gasPrice);
  }, [gasEstimate, feeData]);

  const send = (recipient: `0x${string}`, amt: string) => {
    sendTransaction(
      { to: recipient, value: parseEther(amt) },
      {
        onSuccess: (hash) => {
          setTxHash(hash);
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
    estimatedFee,
  };
}
