import { NextResponse, NextRequest } from 'next/server'
import { randomBytes, createHmac } from 'crypto'

const COOKIE_NAME = 'csrfToken'
const HEADER_NAME = 'csrf-token'
const secret = process.env.CSRF_SECRET || 'development'

function sign(token: string) {
  return createHmac('sha256', secret).update(token).digest('hex')
}

export function generateCsrfToken() {
  const token = randomBytes(32).toString('hex')
  return { token, signed: `${token}.${sign(token)}` }
}

export function setupCsrf() {
  return function middleware(req: NextRequest) {
    const res = NextResponse.next()
    if (!req.cookies.get(COOKIE_NAME)) {
      const { signed } = generateCsrfToken()
      res.cookies.set(COOKIE_NAME, signed, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      })
    }
    return res
  }
}

function verify(signed: string | undefined, token: string | null) {
  if (!signed || !token) return false
  const [raw, hash] = signed.split('.')
  return hash === sign(raw) && raw === token
}

export function csrf<T extends (req: Request) => any>(handler: T) {
  return async function wrapped(req: Request) {
    const cookieHeader = req.headers.get('cookie') || ''
    const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
    const signed = match ? match[1] : undefined
    const token = req.headers.get(HEADER_NAME)

    if (!verify(signed, token)) {
      return new NextResponse('Invalid CSRF token', { status: 403 })
    }

    return handler(req)
  }
}
