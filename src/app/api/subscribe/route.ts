// src/app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { subscribeToBrevo } from '@/lib/email';
import { isRateLimited } from '@/utils/rateLimiter';

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { message: 'Too many requests' },
        { status: 429 }
      );
    }

    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    const response = await subscribeToBrevo(email);
    return NextResponse.json({ message: 'Subscribed', response });
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message === 'already_subscribed') {
        return NextResponse.json({ message: 'Email already subscribed' }, { status: 200 });
      }

      return NextResponse.json(
        { message: err.message || 'Failed to subscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
  }
}
