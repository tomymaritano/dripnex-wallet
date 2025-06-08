import { POST } from './route';
import { describe, it, expect } from 'vitest';
import { generateCsrfToken } from '@/lib/csrf';

describe('POST /api/subscribe', () => {
  it('returns 403 when csrf token is missing', async () => {
    const req = new Request('http://test.com/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it('returns 400 for invalid email', async () => {
    const { token, signed } = generateCsrfToken();
    const req = new Request('http://test.com/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid' }),
      headers: {
        'Content-Type': 'application/json',
        'csrf-token': token,
        cookie: `csrfToken=${signed}`,
      },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ message: 'Invalid email' });
  });
});
