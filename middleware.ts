import { setupCsrf } from './src/lib/csrf'

export const middleware = setupCsrf()

export const config = {
  matcher: ['/api/:path*'],
}
