import Navbar from './Navbar/Navbar';
import Footer from './Footer';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen mt-20 bg-black text-white">{children}</main>
      <Footer />
    </>
  );
}