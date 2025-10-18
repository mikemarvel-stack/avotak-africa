import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const loc = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`} // ⚡ public folder logo
            alt="Avotak logo"
            className="w-10 h-10"
          />
          <div>
            <div className="font-semibold text-lg text-primary">Avotak Africa</div>
            <div className="text-xs text-gray-500">Agricultural Consulting & Fresh Produce</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/produce" className={loc.pathname === '/produce' ? 'text-primary font-medium' : 'text-gray-700'}>Produce</Link>
          <Link to="/services" className={loc.pathname === '/services' ? 'text-primary font-medium' : 'text-gray-700'}>Services</Link>
          <Link to="/projects" className={loc.pathname === '/projects' ? 'text-primary font-medium' : 'text-gray-700'}>Projects</Link>
          <Link to="/contact" className={loc.pathname === '/contact' ? 'text-primary font-medium' : 'text-gray-700'}>Contact</Link>
          <Link to="/dashboard" className="px-3 py-1 bg-primary text-white rounded-md">Dashboard</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            aria-label="menu"
            className="p-2 rounded-md bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <Link
            to="/produce"
            className={`block py-2 ${loc.pathname === '/produce' ? 'text-primary font-medium' : 'text-gray-700'}`}
            onClick={() => setIsOpen(false)}
          >
            Produce
          </Link>
          <Link
            to="/services"
            className={`block py-2 ${loc.pathname === '/services' ? 'text-primary font-medium' : 'text-gray-700'}`}
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/projects"
            className={`block py-2 ${loc.pathname === '/projects' ? 'text-primary font-medium' : 'text-gray-700'}`}
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className={`block py-2 ${loc.pathname === '/contact' ? 'text-primary font-medium' : 'text-gray-700'}`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/dashboard"
            className="block py-2 px-3 bg-primary text-white rounded-md mt-2"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  )
}
