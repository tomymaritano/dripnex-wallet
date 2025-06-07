import { describe, it, expect } from 'vitest';
import { NETWORKS } from '../index';

describe('NETWORKS', () => {
  it('contains ethereum provider', () => {
    expect(NETWORKS.ethereum.chainId).toBe(1);
    expect(NETWORKS.ethereum.name).toBe('Ethereum');
  });

  it('lists polygon', () => {
    expect(NETWORKS.polygon.chainId).toBe(137);
  });

  it('includes ERC20 tokens', () => {
    expect(NETWORKS.ethereum.tokens[0].symbol).toBe('USDC');
  });
});
