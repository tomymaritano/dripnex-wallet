import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('GET /api/nfts', () => {
  it('returns 400 when address is missing', async () => {
    const res = await GET(new Request('http://test.com/api/nfts'));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Missing wallet address' });
  });

  it('returns 400 for invalid address', async () => {
    const res = await GET(new Request('http://test.com/api/nfts?address=bad'));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Invalid address' });
  });
});
