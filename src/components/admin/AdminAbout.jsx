
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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={content.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            rows="6"
            value={content.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
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
