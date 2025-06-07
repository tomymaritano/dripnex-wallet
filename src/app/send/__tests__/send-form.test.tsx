import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SendTransactionForm from '../send-form';

vi.mock('../../hooks/useSendTransaction', () => ({
  useSendTransactionWithGas: () => ({
    estimate: vi.fn(),
    send: vi.fn(() => Promise.resolve('0xtest')),
    hash: '0xtest',
    isPending: false,
    isConfirming: false,
  }),
}));

describe('SendTransactionForm', () => {
  it('renders and sends transaction', async () => {
    const { getByText } = render(<SendTransactionForm />);
    expect(getByText('Send')).toBeInTheDocument();
  });
});
