import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useSendTransaction } from './useSendTransaction';

const mockSendTransaction = vi.fn((_, { onSuccess }) => {
  onSuccess('0xtest');
});

vi.mock('wagmi', () => ({
  useSendTransaction: () => ({
    sendTransaction: mockSendTransaction,
    isPending: false,
    data: undefined,
    error: undefined,
    isError: false,
  }),
  useWaitForTransactionReceipt: () => ({
    isSuccess: true,
    isLoading: false,
  }),
  useEstimateGas: () => ({ data: 100n }),
  useFeeData: () => ({ data: { gasPrice: 2n } }),
}));

vi.mock('viem', () => ({
  parseEther: (v: string) => v,
  formatEther: (v: bigint) => String(v),
}));

test('send uses wagmi and updates txHash', () => {
  const { result } = renderHook(() =>
    useSendTransaction(1, '0xabc' as `0x${string}`, '1')
  );
  act(() => {
    result.current.send('0xabc' as `0x${string}`, '1');
  });
  expect(mockSendTransaction).toHaveBeenCalledWith(
    { to: '0xabc', value: '1' },
    expect.objectContaining({ onSuccess: expect.any(Function) })
  );
  expect(result.current.txHash).toBe('0xtest');
});
