const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const LIMIT = 5;

interface Entry {
  count: number;
  reset: number;
}

const requests = new Map<string, Entry>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requests.get(ip);

  if (!entry || now > entry.reset) {
    requests.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= LIMIT) {
    return true;
  }

  entry.count += 1;
  return false;
}
