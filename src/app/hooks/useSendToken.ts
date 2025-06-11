'use client';

import { erc20Abi, parseUnits } from 'viem';
import { useState } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
import { writeContract } from 'wagmi/actions';

/**
 * Hook to transfer ERC20 tokens using wagmi's `writeContract`.
 *
 * @param chainId Target network chain ID.
 */
export function useSendToken(chainId: number) {
  const [hash, setHash] = useState<`0x${string}` | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: hash!,
    chainId,
    query: { enabled: !!hash },
  });

  const send = async (
    token: `0x${string}`,
    to: `0x${string}`,
    amount: string,
    decimals: number,
  ) => {
    setError(null);
    setIsPending(true);
    try {
      const txHash = await writeContract({
        chainId,
        address: token,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [to, parseUnits(amount, decimals)],
      });
      setHash(txHash);
      return txHash;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  return { send, hash, isConfirming, isSuccess, isPending, error, isError: !!error };
}
