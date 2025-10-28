import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import useAdminStore from '../../store/useAdminStore';
import AdminLogin from './AdminLogin';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminHome from './AdminHome';
import AdminServices from './AdminServices';
import AdminProjects from './AdminProjects';
import AdminProduce from './AdminProduce';
import AdminGallery from './AdminGallery';
import Navbar from '../Navbar';
import Footer from '../Footer';
import StickySocials from '../StickySocials';
import BackToTop from '../BackToTop';
import { FaUserCircle } from 'react-icons/fa';

function AdminTopbar() {
  const location = useLocation();
  const { logout } = useAdminStore();

  // Extract current page name from path
  const currentPage = location.pathname.split('/').pop() || 'dashboard';
  const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md sticky top-0 z-10">
      <h2 className="text-xl font-semibold">{pageTitle}</h2>
      <div className="flex items-center space-x-4">
        <span className="flex items-center space-x-2 cursor-pointer" onClick={logout}>
          <FaUserCircle className="text-2xl text-green-600" />
          <span className="text-green-600 font-medium hover:underline">Logout</span>
        </span>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { isAdmin } = useAdminStore();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col relative bg-white text-gray-800 antialiased">
        <Navbar />
        <StickySocials />
        <BackToTop />
        <main className="flex-1 flex items-center justify-center">
          <AdminLogin />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top navbar */}
        <AdminTopbar />

        <div className="p-6 md:p-8 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="produce" element={<AdminProduce />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
