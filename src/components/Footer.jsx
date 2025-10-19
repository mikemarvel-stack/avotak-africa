import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkStyle = 'cursor-pointer hover:text-green-700 transition';

  return (
    <motion.footer
      className="bg-gray-50 border-t text-gray-700 relative z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <div className="font-bold text-xl text-green-800 mb-2">Avotak Africa Ltd</div>
          <div className="text-sm text-gray-600 mb-4">
            Sustainable agricultural consulting • Fresh fruits & herbs • Value chain support
          </div>
          <div className="flex items-center gap-3 text-gray-600 mb-1">
            <MapPin className="w-4 h-4" />
            <span>123 Greenway Rd, Nairobi, Kenya</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 mb-1">
            <Phone className="w-4 h-4" />
            <span
              onClick={() => handleNavigate('/contact')}
              className={linkStyle}
            >
              +254 711 281 829
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-4 h-4" />
            <span
              onClick={() => handleNavigate('/contact')}
              className={linkStyle}
            >
              info@avotakafrica.com
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="font-semibold text-green-800 mb-4">Quick Links</div>
          <ul className="space-y-2 text-gray-600">
            <li>
              <span
                onClick={() => handleNavigate('/about')}
                className={linkStyle}
              >
                About Us
              </span>
            </li>
            <li>
              <span
                onClick={() => handleNavigate('/produce')}
                className={linkStyle}
              >
                Produce
              </span>
            </li>
            <li>
              <span
                onClick={() => handleNavigate('/services')}
                className={linkStyle}
              >
                Services
              </span>
            </li>
            <li>
              <span
                onClick={() => handleNavigate('/projects')}
                className={linkStyle}
              >
                Projects
              </span>
            </li>
            <li>
              <span
                onClick={() => handleNavigate('/contact')}
                className={linkStyle}
              >
                Contact
              </span>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <div className="font-semibold text-green-800 mb-4">Connect With Us</div>
          <div className="flex items-center gap-4 mb-4">
            <a href="#" aria-label="Facebook" className="hover:text-green-700 transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-green-700 transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-green-700 transition">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-green-700 transition">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Subscribe to our newsletter for updates:
          </div>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Avotak Africa Ltd. All rights reserved.
      </div>
    </motion.footer>
  );
}
