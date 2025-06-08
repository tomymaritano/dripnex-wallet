// src/middleware.ts
import type { NextRequest } from 'next/server'
import { setupCsrf } from './src/lib/csrf'
import { randomBytes } from 'crypto'

const isDev = process.env.NODE_ENV !== 'production'

const csrfMiddleware = setupCsrf()

export function middleware(req: NextRequest) {
  const res = csrfMiddleware(req)


  const nonce = isDev ? undefined : randomBytes(16).toString('base64')

  // Dynamic CSP depending on environment
  const csp = `
    default-src 'self';
    script-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`} https:;
    style-src 'self' 'unsafe-inline' https:;
    img-src * blob: data:;
    connect-src *;
    font-src 'self' https: data:;
    object-src 'none';
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim()

  res.headers.set('Content-Security-Policy', csp)
  if (nonce) {
    res.headers.set('X-Nonce', nonce)
  }

  return res
}

export const config = {
  matcher: ['/api/:path*', '/', '/wallet', '/profile', '/about'],
}
