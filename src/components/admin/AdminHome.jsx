import React from 'react';
import { Loader2 } from 'lucide-react';
import useAdminContent from '../../hooks/useAdminContent';

export default function AdminHome() {
  const {
    content,
    setContent,
    loading,
    saving,
    error,
    success,
    handleSubmit,
  } = useAdminContent('/content/home', { title: '', subtitle: '' });

  const handleFieldChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-4 flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Home Page Content</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="border-b pb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Hero Section</h2>
          <p className="text-sm text-gray-600 mb-4">Customize the main hero section of your homepage</p>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
            <input
              type="text"
              id="title"
              value={content.title || content.heroTitle || ''}
              onChange={(e) => handleFieldChange('heroTitle', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Premium African Produce"
              aria-label="Hero section title"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
            <textarea
              id="subtitle"
              rows="3"
              value={content.subtitle || content.heroSubtitle || ''}
              onChange={(e) => handleFieldChange('heroSubtitle', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Fresh from our farms to your table"
              aria-label="Hero section subtitle"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Slider Images</h2>
          <p className="text-sm text-gray-600 mb-4">Manage homepage slider images (coming soon)</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 className="animate-spin" size={16} />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}