
import React from 'react';
import { Link } from 'react-router-dom';

export default function ManageContent() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <Link to="/admin" className="text-primary hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Website Content</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Content Management</h2>
        <p className="text-gray-600">
          This section is under construction. Here you will be able to edit various text and media content across the website.
        </p>
      </div>
    </div>
  );
}
