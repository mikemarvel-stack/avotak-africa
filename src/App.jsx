import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import StickySocials from './components/StickySocials';
import TawkChat from './components/TawkChat'; // Floating chat button

import Home from './pages/Home';
import Produce from './pages/Produce';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs'; // Import AboutUs page

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Navbar */}
      <Navbar />

      {/* Sticky Social Icons */}
      <StickySocials />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produce" element={<Produce />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<AboutUs />} /> {/* Added About Us Route */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Back-to-Top Button */}
      <BackToTop />

      {/* Floating Tawk Chat */}
      <TawkChat />
    </div>
  );
}
