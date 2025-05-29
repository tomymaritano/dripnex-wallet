// src/app/layout.tsx';

import { Web3Wrapper } from "@/components/Web3Wrapper";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Web3Wrapper>
          {children}
        </Web3Wrapper>
      </body>
    </html>
  );
}