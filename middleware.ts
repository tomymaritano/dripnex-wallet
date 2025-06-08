// middleware.ts
import type { NextRequest } from 'next/server'
import { setupCsrf } from './src/lib/csrf'

const csrfMiddleware = setupCsrf()

export function middleware(req: NextRequest) {
  const res = csrfMiddleware(req)

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src * blob: data:",
    "connect-src 'self' https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "object-src 'none'",
    "frame-ancestors 'none'",
  ].join('; ')

  res.headers.set('Content-Security-Policy', csp)
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs',
}
