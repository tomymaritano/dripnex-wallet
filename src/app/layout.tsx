import { Web3Wrapper } from "@/components/Web3Wrapper";
import { Toaster } from 'react-hot-toast';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';


/**
 * Application root layout used by Next.js.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ServiceWorkerRegister />
        <Web3Wrapper>
          <Toaster position="top-right" />

          {children}
        </Web3Wrapper>
      </body>
    </html>
  );
}