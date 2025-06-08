import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setupCsrf } from './csrf'
import { NextRequest } from 'next/server'

const URL = 'https://example.com/'

let originalEnv: string | undefined

beforeEach(() => {
  originalEnv = process.env.NODE_ENV
})

afterEach(() => {
  process.env.NODE_ENV = originalEnv
})

describe('setupCsrf middleware', () => {
  it('sets secure flag when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production'
    const middleware = setupCsrf()
    const req = new NextRequest(URL)
    const res = middleware(req)
    const cookie = res.cookies.get('csrfToken')
    expect(cookie?.value).toBeDefined()
    expect(cookie?.options.secure).toBe(true)
  })

  it('does not set secure flag when NODE_ENV is not production', () => {
    process.env.NODE_ENV = 'development'
    const middleware = setupCsrf()
    const req = new NextRequest(URL)
    const res = middleware(req)
    const cookie = res.cookies.get('csrfToken')
    expect(cookie?.options.secure).toBe(false)
  })
})
