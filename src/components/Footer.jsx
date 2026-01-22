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
  Leaf,
  ArrowRight,
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
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-2.5 rounded-xl shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-2xl">Avotak Africa</div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering African farmers through sustainable practices, expert consultancy, and market access.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-300 text-sm group">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="group-hover:text-white transition-colors">Songea Road, Mgendela Street.</span>
                <span className="group-hover:text-white transition-colors">P.O. Box 319, Njombe-Tanzania</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm group cursor-pointer" onClick={() => handleNavigate('/contact')}>
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">+255 747 799 873</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm group cursor-pointer" onClick={() => handleNavigate('/contact')}>
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">info@avotakafrica.co.tz</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[{ name: 'About Us', path: '/about' }, { name: 'Our Produce', path: '/produce' }, { name: 'Services', path: '/services' }, { name: 'Projects', path: '/projects' }, { name: 'Contact', path: '/contact' }].map((link) => (
                <li key={link.path}>
                  <span
                    onClick={() => handleNavigate(link.path)}
                    className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Our Services</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:text-green-400 transition-colors cursor-pointer">Farm Advisory</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Quality Management</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Export Facilitation</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Training Programs</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Supply Chain Support</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Stay Connected</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe for updates on fresh produce and agricultural insights.
            </p>
            <form className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex items-center gap-4">
              {[{ Icon: Facebook, label: 'Facebook' }, { Icon: Twitter, label: 'Twitter' }, { Icon: Instagram, label: 'Instagram' }, { Icon: Linkedin, label: 'LinkedIn' }].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2.5 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-green-600 transition-all hover:scale-110 group"
                >
                  <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Avotak Africa Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span className="hover:text-green-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-green-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-green-400 transition-colors cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
