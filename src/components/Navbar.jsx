import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf } from 'lucide-react';

export default function Navbar() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = (path) =>
    loc.pathname === path
      ? 'text-green-700 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-700'
      : 'text-gray-700 hover:text-green-700 transition-colors duration-300 relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-700 after:transition-all';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-green-700/20 rounded-full blur-xl group-hover:bg-green-700/30 transition-all"></div>
              <div className="relative bg-gradient-to-br from-green-600 to-green-800 p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="font-bold text-xl bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                Avotak Africa
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Agricultural Excellence
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/about" className={linkClass('/about')}>About</Link>
            <Link to="/produce" className={linkClass('/produce')}>Produce</Link>
            <Link to="/services" className={linkClass('/services')}>Services</Link>
            <Link to="/projects" className={linkClass('/projects')}>Projects</Link>
            <Link
              to="/admin"
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700 hover:text-green-700 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                to="/produce"
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700 hover:text-green-700 font-medium transition-colors"
              >
                Produce
              </Link>
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700 hover:text-green-700 font-medium transition-colors"
              >
                Services
              </Link>
              <Link
                to="/projects"
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700 hover:text-green-700 font-medium transition-colors"
              >
                Projects
              </Link>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium shadow-md"
              >
                Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
