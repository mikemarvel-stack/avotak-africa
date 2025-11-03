import useAdminStore from '../../store/useAdminStore';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clipboard, Briefcase, ShoppingCart, Image, Home } from 'lucide-react';

const StatCard = ({ icon, title, value, link, loading }) => (
  <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
    <div className="flex items-center">
      <div className="p-3 bg-green-100 rounded-full">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {loading ? (
          <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        )}
      </div>
    </div>
  </Link>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    produce: 0,
    gallery: 0,
    home: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, apiCall } = useAdminStore(state => ({ user: state.user, apiCall: state.apiCall }));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setError(null);
        setLoading(true);

        const endpoints = [
          '/content/projects',
          '/content/services',
          '/content/produce',
          '/content/gallery',
          '/content/home',
        ];

        const responses = await Promise.all(endpoints.map(url => apiCall(url)));
        
        setStats({
          projects: responses[0]?.length || 0,
          services: responses[1]?.services?.length || 0,
          produce: responses[2]?.length || 0,
          gallery: responses[3]?.length || 0,
          home: responses[4]?.sliderImages?.length || 0,
        });

      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError('Could not load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [apiCall]);

  const sections = [
    { key: 'home', title: 'Home Slider Images', link: '/admin/home', icon: <Home className="w-6 h-6 text-green-600" /> },
    { key: 'projects', title: 'Projects', link: '/admin/projects', icon: <Clipboard className="w-6 h-6 text-green-600" /> },
    { key: 'services', title: 'Services', link: '/admin/services', icon: <Briefcase className="w-6 h-6 text-green-600" /> },
    { key: 'produce', title: 'Produce Items', link: '/admin/produce', icon: <ShoppingCart className="w-6 h-6 text-green-600" /> },
    { key: 'gallery', title: 'Gallery Images', link: '/admin/gallery', icon: <Image className="w-6 h-6 text-green-600" /> },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back, {user?.username || 'Admin'}!</p>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(section => (
          <StatCard
            key={section.key}
            icon={section.icon}
            title={section.title}
            value={stats[section.key]}
            link={section.link}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}