
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StickySocials from './StickySocials';
import BackToTop from './BackToTop';
import TawkChat from './TawkChat';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative bg-white text-gray-800 antialiased">
      <Navbar />
      <StickySocials />
      <BackToTop />
      <TawkChat />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
