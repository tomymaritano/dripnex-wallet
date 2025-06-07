import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TransferPanel from '../TransferPanel';

vi.mock('@/app/hooks/useSendTransaction', () => ({
  useSendTransactionWithGas: () => ({
    estimate: vi.fn(),
    send: vi.fn(() => Promise.resolve('0xtest')),
    hash: '0xtest',
    isPending: false,
    isConfirming: false,
  }),
}));

vi.mock('wagmi', () => ({
  useBalance: () => ({ data: { formatted: '0' } }),
}));

describe('SendReceivePanel', () => {
  it('renders send tab by default', () => {
    const { getByText } = render(<TransferPanel address="0x123" />);
    expect(getByText('Send')).toBeInTheDocument();
  });
});
