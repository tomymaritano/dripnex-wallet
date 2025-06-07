import { POST } from './route';
import { describe, it, expect } from 'vitest';

describe('POST /api/subscribe', () => {
  it('returns 400 for invalid email', async () => {
    const req = new Request('http://test.com/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ message: 'Invalid email' });
  });
});
