import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAdminStore from '../../store/useAdminStore';
import {
  BarChart2,
  Home,
  Briefcase,
  Clipboard,
  ShoppingCart,
  Image,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export default function AdminSidebar() {
  const { logout } = useAdminStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(`/admin${path}`);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <BarChart2 className="w-5 h-5" /> },
    { path: '/home', label: 'Home Page', icon: <Home className="w-5 h-5" /> },
    { path: '/services', label: 'Services', icon: <Briefcase className="w-5 h-5" /> },
    { path: '/projects', label: 'Projects', icon: <Clipboard className="w-5 h-5" /> },
    { path: '/produce', label: 'Produce', icon: <ShoppingCart className="w-5 h-5" /> },
    { path: '/gallery', label: 'Gallery', icon: <Image className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-800 text-white p-4 flex flex-col justify-between transform transition-transform duration-300 z-40 shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div>
          <h1 className="text-2xl font-bold mb-8">Avotak Admin</h1>
          <nav className="space-y-2">
            {menuItems.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={`/admin${path}`}
                onClick={() => setIsOpen(false)} // close on mobile after click
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  isActive(path)
                    ? 'bg-green-700 text-white'
                    : 'text-green-100 hover:bg-green-700'
                }`}
              >
                {icon}
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center space-x-2 p-2 rounded-lg text-green-100 hover:bg-green-700"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
