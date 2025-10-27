import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAdminStore from '../../store/useAdminStore';
import AdminLogin from './AdminLogin';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminHome from './AdminHome';
import AdminServices from './AdminServices';
import AdminProjects from './AdminProjects';
import AdminProduce from './AdminProduce';
import AdminGallery from './AdminGallery';

export default function AdminLayout() {
  const { isAdmin } = useAdminStore();

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="produce" element={<AdminProduce />} />
          <Route path="gallery" element={<AdminGallery />} />
        </Routes>
      </div>
    </div>
  );
}