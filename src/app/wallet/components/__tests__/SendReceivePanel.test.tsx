import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SendReceivePanel from '../SendReceivePanel';

vi.mock('@/app/hooks/useSendTransaction', () => ({
  useSendTransactionWithGas: () => ({
    estimate: vi.fn(),
    send: vi.fn(() => Promise.resolve('0xtest')),
    hash: '0xtest',
    isPending: false,
    isConfirming: false,
  }),
}));

describe('SendReceivePanel', () => {
  it('renders send tab by default', () => {
    const { getByText } = render(<SendReceivePanel address="0x123" />);
    expect(getByText('Send')).toBeInTheDocument();
  });
});
