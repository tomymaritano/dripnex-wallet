// src/middleware.ts
import type { NextRequest } from 'next/server'
import { randomBytes } from 'crypto'
import { setupCsrf } from './src/lib/csrf'

const csrfMiddleware = setupCsrf()

export function middleware(req: NextRequest) {
  const res = csrfMiddleware(req)

  const isDev = process.env.NODE_ENV !== 'production'
  const nonce = isDev ? '' : randomBytes(16).toString('base64')

  const csp = `
    default-src 'self';
    script-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`} https:;
    style-src 'self' ${isDev ? "'unsafe-inline'" : ''} https:;
    img-src * blob: data:;
    connect-src *;
    font-src 'self' https: data:;
    object-src 'none';
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim()

  res.headers.set('Content-Security-Policy', csp)
  if (!isDev) res.headers.set('x-nonce', nonce)

  return res
}

export const config = {
  matcher: ['/api/:path*', '/', '/wallet', '/profile', '/about'],
}