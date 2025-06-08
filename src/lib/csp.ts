export const walletConnectHosts = [
  'https://relay.walletconnect.com',
  'https://*.walletconnect.com',
];

export function buildCsp(nonce?: string) {
  const directives = [
    "default-src 'self'",
    `script-src 'self'${nonce ? ` 'nonce-${nonce}'` : ''}`,
    "style-src 'self' https://fonts.googleapis.com",
    "img-src * blob: data:",
    `connect-src 'self' https: wss: ${walletConnectHosts.join(' ')}`,
    "font-src 'self' https://fonts.gstatic.com data:",
    "object-src 'none'",
    "frame-ancestors 'none'",
  ];
  return directives.join('; ');
}
