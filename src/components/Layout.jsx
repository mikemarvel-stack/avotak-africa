
import Footer from './Footer';
import Navbar from './Navbar';
import TawkChat from './TawkChat';
import StickySocials from './StickySocials';
import BackToTop from './BackToTop';
import { Outlet } from 'react-router-dom';
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
