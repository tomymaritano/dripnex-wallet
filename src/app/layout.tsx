import { Web3Wrapper } from "@/components/Web3Wrapper";
import { Toaster } from 'react-hot-toast';
import { headers } from 'next/headers';


/**
 * Application root layout used by Next.js.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get('x-nonce') || undefined;
  return (
    <html lang="en">
      <body nonce={nonce}>
        <Web3Wrapper>
          <Toaster position="top-right" />

          {children}
        </Web3Wrapper>
      </body>
    </html>
  );
}