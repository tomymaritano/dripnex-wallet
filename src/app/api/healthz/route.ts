// src/app/api/healthz/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { Redis } from '@upstash/redis'
import { env } from '@/lib/env'

const redis = Redis.fromEnv()

/**
 * Liveness and readiness check for external services.
 */
export async function GET() {
  try {
    // Verify Supabase connectivity via a trivial request
    const { error: supabaseError } = await supabase.from('profiles').select('id').limit(1)
    if (supabaseError) {
      throw supabaseError
    }

    // Verify Redis connectivity
    await redis.ping()

    // Verify Etherscan connectivity
    const url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${env.ETHERSCAN_API_KEY}`
    const etherscanRes = await fetch(url)
    if (!etherscanRes.ok) {
      throw new Error('Etherscan request failed')
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
