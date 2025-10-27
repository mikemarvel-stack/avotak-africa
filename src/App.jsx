import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import StickySocials from './components/StickySocials'
import BackToTop from './components/BackToTop'
import TawkChat from './components/TawkChat'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Produce from './pages/Produce'
import Projects from './pages/Projects'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <StickySocials />
      <BackToTop />
      <TawkChat />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produce" element={<Produce />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}
