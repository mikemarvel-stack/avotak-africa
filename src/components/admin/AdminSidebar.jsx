import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAdminStore from '../../store/useAdminStore';

export default function AdminSidebar() {
  const { logout } = useAdminStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const isActive = (path) => location.pathname === `/admin${path}`;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'chart-bar' },
    { path: '/home', label: 'Home Page', icon: 'home' },
    { path: '/services', label: 'Services', icon: 'briefcase' },
    { path: '/projects', label: 'Projects', icon: 'clipboard' },
    { path: '/produce', label: 'Produce', icon: 'shopping-cart' },
    { path: '/gallery', label: 'Gallery', icon: 'photograph' },
  ];

  return (
    <div className="w-64 bg-green-800 text-white p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Avotak Admin</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={`/admin${path}`}
            className={`flex items-center space-x-2 p-2 rounded-lg ${
              isActive(path)
                ? 'bg-green-700 text-white'
                : 'text-green-100 hover:bg-green-700'
            }`}
          >
            <span className={`heroicon-${icon} w-5 h-5`} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 w-64 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg text-green-100 hover:bg-green-700"
        >
          <span className="heroicon-logout w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}