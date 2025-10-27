import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import StickySocials from './components/StickySocials'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import AdminLayout from './components/admin/AdminLayout'

// Pages
import Home from './pages/Home'
import Produce from './pages/Produce'
import Projects from './pages/Projects'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AdminLayout />;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <StickySocials />
      <BackToTop />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produce" element={<Produce />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}
