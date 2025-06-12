import { render } from '@testing-library/react';
import WalletInfoCard from '../../../../components/WalletInfoCard';

vi.mock('@/app/hooks/useWalletInfo', () => ({
  useWalletInfo: () => ({
    address: '0x123',
    isConnected: true,
    balance: '10',
    balanceSymbol: 'ETH',
  }),
}));

describe('WalletInfoCard', () => {
  it('displays balance', () => {
    const { getByText } = render(<WalletInfoCard />);
    expect(getByText('10 ETH')).toBeInTheDocument();
  });
});