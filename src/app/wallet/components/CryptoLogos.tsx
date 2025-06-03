// src/components/CryptoLogos.tsx
import {
  FaEthereum,
  FaBitcoin,
  FaDog,
  FaCoins,
} from 'react-icons/fa';
import { SiSolana, SiLitecoin } from 'react-icons/si';

export function CryptoLogos({ symbol }: { symbol: string }) {
  const iconProps = { className: 'inline mr-2 text-lg' };

  switch (symbol) {
    case 'ETH':
      return <FaEthereum {...iconProps} />;
    case 'BTC':
      return <FaBitcoin {...iconProps} />;
    case 'SOL':
      return <SiSolana {...iconProps} />;
    case 'LTC':
      return <SiLitecoin {...iconProps} />;
    case 'DOGE':
      return <FaDog {...iconProps} />;
    default:
      return <FaCoins {...iconProps} />;
  }
}