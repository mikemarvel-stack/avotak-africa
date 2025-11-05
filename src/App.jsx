import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Info, Package } from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import TawkChat from './components/TawkChat';

// Lazy-loaded page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Produce = lazy(() => import('./pages/Produce'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));

// Lazy-loaded admin components
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminHome = lazy(() => import('./components/admin/AdminHome'));
const AdminAbout = lazy(() => import('./components/admin/AdminAbout'));
const AdminProduce = lazy(() => import('./components/admin/AdminProduce'));

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <TawkChat />
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/produce" element={<Produce />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="produce" element={<AdminProduce />} />
            {/* Add other admin routes here */}
            {/* <Route path="services" element={<AdminServices />} /> */}
            {/* <Route path="projects" element={<AdminProjects />} /> */}
            {/* <Route path="gallery" element={<AdminGallery />} /> */}
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}