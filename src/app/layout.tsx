import { Web3Wrapper } from "@/components/Web3Wrapper";
import { Toaster } from 'react-hot-toast';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Web3Wrapper>
          <Toaster position="top-right" />

          {children}
        </Web3Wrapper>
      </body>
    </html>
  );
}