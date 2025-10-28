import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAdminStore from '../../store/useAdminStore';
import { FaFolder, FaCogs, FaLeaf, FaImages } from 'react-icons/fa';

const StatCard = ({ title, count, icon, link }) => (
  <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
    <div className="text-3xl text-green-600">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </Link>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, services: 0, produce: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, services, produce, gallery] = await Promise.all([
          apiCall('/content/projects'),
          apiCall('/content/services'),
          apiCall('/content/produce'),
          apiCall('/content/gallery'),
        ]);
        setStats({
          projects: projects.length,
          services: services.length,
          produce: produce.length,
          gallery: gallery.length,
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [apiCall]);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Projects" count={stats.projects} icon={<FaFolder />} link="/dashboard/projects" />
        <StatCard title="Services" count={stats.services} icon={<FaCogs />} link="/dashboard/services" />
        <StatCard title="Produce" count={stats.produce} icon={<FaLeaf />} link="/dashboard/produce" />
        <StatCard title="Gallery Items" count={stats.gallery} icon={<FaImages />} link="/dashboard/gallery" />
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
        <p className="text-gray-700">
          You can manage all website content from here. Use the sidebar or the cards above to navigate to the different sections.
        </p>
      </div>
    </div>
  );
}
