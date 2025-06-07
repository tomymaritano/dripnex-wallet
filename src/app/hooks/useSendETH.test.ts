import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useSendEth } from './useSendETH';

const mockSendTransaction = vi.fn((_, { onSuccess }) => {
  onSuccess('0xtest');
});

vi.mock('wagmi', () => ({
  useAccount: () => ({ address: '0x123' }),
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
}));

vi.mock('viem', () => ({
  parseEther: (v: string) => v,
}));

test('send calls wagmi and updates txHash', () => {
  const { result } = renderHook(() => useSendEth());
  act(() => {
    result.current.send('0xabc', '1');
  });
  expect(mockSendTransaction).toHaveBeenCalledWith(
    { to: '0xabc', value: '1' },
    expect.objectContaining({ onSuccess: expect.any(Function) })
  );
  expect(result.current.txHash).toBe('0xtest');
});
