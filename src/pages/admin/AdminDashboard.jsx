
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Image, Info } from 'lucide-react';

export default function AdminDashboard() {
  const adminLinks = [
    { to: '/admin/content', icon: <Info className="w-5 h-5" />, label: 'Manage Content' },
    { to: '/admin/gallery', icon: <Image className="w-5 h-5" />, label: 'Manage Gallery' },
    { to: '/admin/produce', icon: <ShoppingBag className="w-5 h-5" />, label: 'Manage Produce' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Welcome, Admin!</h2>
          <p className="text-gray-600">
            From here you can manage the website's content. Use the links below to navigate to the different sections.
          </p>
        </div>
        
        {adminLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-light rounded-full text-primary">
                {link.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{link.label}</h3>
                <p className="text-gray-500">Update and modify section</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
