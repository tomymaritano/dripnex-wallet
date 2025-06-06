import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const WINDOW_SECONDS = 60 * 60 // 1 hour
const LIMIT = 5

/**
 * Basic rate limiter using Upstash Redis.
 *
 * @param ip Client IP address.
 * @returns `true` if the rate limit is exceeded.
 */
export async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate_limit:${ip}`
  try {
    const count = await redis.incr(key)
    if (count === 1) {
      await redis.expire(key, WINDOW_SECONDS)
    }
    return count > LIMIT
  } catch {
    // If Redis fails, allow the request
    return false
  }
}
