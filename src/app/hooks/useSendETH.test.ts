import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useSendEth } from './useSendETH';

const mockSendTransactionAsync = vi.fn(() => Promise.resolve('0xtest'));

vi.mock('wagmi', () => ({
  useAccount: () => ({ address: '0x123' }),
  useSendTransaction: () => ({
    sendTransactionAsync: mockSendTransactionAsync,
    isPending: false,
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

test('send calls wagmi and updates txHash', async () => {
  const { result } = renderHook(() => useSendEth());
  await act(async () => {
    await result.current.send('0xabc', '1');
  });
  expect(mockSendTransactionAsync).toHaveBeenCalledWith({
    to: '0xabc',
    value: '1',
  });
  expect(result.current.txHash).toBe('0xtest');
});
