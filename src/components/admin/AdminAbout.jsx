
import { Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import useAdminContent from '../../hooks/useAdminContent';
import React from 'react';

export default function AdminAbout() {
  const {
    content,
    setContent,
    loading,
    saving,
    error,
    success,
    handleSubmit,
  } = useAdminContent('/content/about', { title: '', description: '', imageUrl: '' });

  const handleFieldChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-4 flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage About Page</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">About Us Content</h2>
          <p className="text-sm text-gray-600 mb-4">Customize your About Us page content</p>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            id="title"
            value={content.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., Avotak Africa Limited"
            aria-label="About page title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
          <textarea
            id="description"
            rows="6"
            value={content.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Tell your company story..."
            aria-label="About page description"
          />
        </div>
        
        <div>
          <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
          <textarea
            id="mission"
            rows="3"
            value={content.mission || ''}
            onChange={(e) => handleFieldChange('mission', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your company mission..."
          />
        </div>
        
        <div>
          <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-1">Vision Statement</label>
          <textarea
            id="vision"
            rows="3"
            value={content.vision || ''}
            onChange={(e) => handleFieldChange('vision', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your company vision..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <ImageUpload onImageUploaded={(url) => handleFieldChange('imageUrl', url)} />
          {content.imageUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Current Image:</p>
              <img src={content.imageUrl} alt="About us" className="h-32 w-auto object-cover rounded-md" />
            </div>
          )}
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
