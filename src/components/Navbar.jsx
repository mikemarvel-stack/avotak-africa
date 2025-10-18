import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const loc = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Avotak logo" className="w-10 h-10" />
          <div>
            <div className="font-semibold text-lg text-primary">Avotak Africa</div>
            <div className="text-xs text-gray-500">Agricultural Consulting & Fresh Produce</div>
          </div>
        </Link>

        <div className={`md:flex items-center gap-6 ${open ? 'flex' : 'hidden'}`}>
          <Link to="/produce" className={loc.pathname === '/produce' ? 'text-primary font-medium' : 'text-gray-700'}>Produce</Link>
          <Link to="/services" className={loc.pathname === '/services' ? 'text-primary font-medium' : 'text-gray-700'}>Services</Link>
          <Link to="/projects" className={loc.pathname === '/projects' ? 'text-primary font-medium' : 'text-gray-700'}>Projects</Link>
          <Link to="/contact" className={loc.pathname === '/contact' ? 'text-primary font-medium' : 'text-gray-700'}>Contact</Link>
          <Link to="/dashboard" className="px-3 py-1 bg-primary text-white rounded-md">Dashboard</Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="menu" className="p-2 rounded-md bg-gray-100">
            Menu
          </button>
        </div>
      </div>
    </nav>
  )
}
