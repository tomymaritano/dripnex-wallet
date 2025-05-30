// src/app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { subscribeToBrevo } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    const response = await subscribeToBrevo(email);
    return NextResponse.json({ message: 'Subscribed', response });
  } catch (err: any) {
    if (err.message === 'already_subscribed') {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 200 });
    }

    return NextResponse.json(
      { message: err.message || 'Failed to subscribe' },
      { status: 500 }
    );
  }
}