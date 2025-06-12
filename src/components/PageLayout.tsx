import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/**
 * Layout component used across pages with navbar and footer.
 *
 * @param props.children Page content.
 */
export default function PageLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header>
        <Navbar />
      </header>

      <main className="flex-1 mt-20 px-4 sm:px-6 lg:px-8 max-w-9xl mx-auto w-full">
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}