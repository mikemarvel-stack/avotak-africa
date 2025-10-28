import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAdminStore from '../../store/useAdminStore';
import { FaFolder, FaCogs, FaLeaf, FaImages } from 'react-icons/fa';

const StatCard = ({ title, count, icon, link }) => (
  <Link
    to={link}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-4 border border-transparent hover:border-green-500"
  >
    <div className="text-3xl text-green-600">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </Link>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    produce: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiCall = useAdminStore((state) => state.apiCall);

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
        ];

        const responses = await Promise.all(endpoints.map((endpoint) => apiCall(endpoint)));

        setStats({
          projects: responses[0]?.length || 0,
          services: responses[1]?.length || 0,
          produce: responses[2]?.length || 0,
          gallery: responses[3]?.length || 0,
        });
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
        setError('Failed to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [apiCall]);

  if (loading) return <div className="p-8 text-gray-600">Loading dashboard...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6 border border-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Projects" count={stats.projects} icon={<FaFolder />} link="/dashboard/projects" />
        <StatCard title="Services" count={stats.services} icon={<FaCogs />} link="/dashboard/services" />
        <StatCard title="Produce" count={stats.produce} icon={<FaLeaf />} link="/dashboard/produce" />
        <StatCard title="Gallery Items" count={stats.gallery} icon={<FaImages />} link="/dashboard/gallery" />
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Welcome, Admin 👋</h2>
        <p className="text-gray-700 leading-relaxed">
          From this dashboard, you can manage all the website’s content — including homepage
          text, services, projects, produce listings, and gallery images.
          <br />
          Use the sidebar or the cards above to navigate to different sections.
        </p>
      </div>
    </div>
  );
}
