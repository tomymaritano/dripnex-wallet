// middleware.ts
import type { NextRequest } from 'next/server'
import { setupCsrf } from './src/lib/csrf'
import { buildCsp } from './src/lib/csp'

const csrfMiddleware = setupCsrf()

export function middleware(req: NextRequest) {
  const res = csrfMiddleware(req)
  const nonce = req.headers.get('x-nonce') || undefined
  res.headers.set('Content-Security-Policy', buildCsp(nonce))
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs',
}
