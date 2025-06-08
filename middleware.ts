// middleware.ts
import type { NextRequest } from 'next/server'
import { setupCsrf } from './src/lib/csrf'
import { setSecurityHeaders } from './src/middleware/securityHeaders'

const csrfMiddleware = setupCsrf()

export function middleware(req: NextRequest) {
  const res = csrfMiddleware(req)
  setSecurityHeaders(res)
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs',
}
