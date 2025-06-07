import { GET } from './route';
import { describe, it, expect } from 'vitest';

describe('GET /api/etherscan', () => {
  it('returns 400 when address is missing', async () => {
    const res = await GET(new Request('http://test.com/api/etherscan'));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Missing wallet address' });
  });
});
