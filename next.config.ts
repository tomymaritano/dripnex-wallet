import type { NextConfig } from "next";
import { buildCsp } from "./src/lib/csp";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: buildCsp(),
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'same-origin' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['coin-images.coingecko.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
