import { vi, describe, it, expect } from 'vitest'
import { GET } from './route'

// Mock env
vi.mock('@/lib/env', () => ({ env: { ETHERSCAN_API_KEY: 'test' } }))

// Mock Supabase client
vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        limit: () => Promise.resolve({ data: [], error: null }),
      }),
    }),
  },
}))

// Mock Upstash Redis
vi.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: () => ({
      ping: vi.fn().mockResolvedValue('PONG'),
    }),
  },
}))

// Mock fetch for Etherscan
vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true } as Response)))

describe('GET /api/healthz', () => {
  it('returns ok when all services respond', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ ok: true })
  })
})
