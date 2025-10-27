import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const linkClass = (path) =>
    loc.pathname === path
      ? 'text-primary font-medium'
      : 'text-gray-700 hover:text-primary transition';

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="Avotak logo"
            className="w-10 h-10"
          />
          <div>
            <div className="font-semibold text-lg text-primary">Avotak Africa</div>
            <div className="text-xs text-gray-500">
              Agricultural Consulting & Fresh Produce
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className={`md:flex items-center gap-6 ${open ? 'flex' : 'hidden'}`}>
          <Link to="/about" className={linkClass('/about')}>About Us</Link>
          <Link to="/produce" className={linkClass('/produce')}>Produce</Link>
          <Link to="/services" className={linkClass('/services')}>Services</Link>
          <Link to="/projects" className={linkClass('/projects')}>Projects</Link>
          <Link
            to="/dashboard"
            className="px-3 py-1 bg-primary text-white rounded-md"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="menu"
            className="p-2 rounded-md bg-gray-80"
          >
            {open ? (
              <span className="text-2xl">&#10005;</span> // X icon
            ) : (
              <span className="text-2xl">&#9776;</span> // Hamburger icon
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 w-full z-10 flex flex-col px-4 py-4 space-y-3 animate-slide-down">
          <Link to="/about" onClick={() => setOpen(false)} className={linkClass('/about')}>
            About Us
          </Link>
          <Link to="/produce" onClick={() => setOpen(false)} className={linkClass('/produce')}>
            Produce
          </Link>
          <Link to="/services" onClick={() => setOpen(false)} className={linkClass('/services')}>
            Services
          </Link>
          <Link to="/projects" onClick={() => setOpen(false)} className={linkClass('/projects')}>
            Projects
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="px-3 py-1 bg-primary text-white rounded-md"
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
