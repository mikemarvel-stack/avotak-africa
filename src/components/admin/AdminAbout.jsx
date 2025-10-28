
import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import ImageUpload from './ImageUpload';
import { Loader2 } from 'lucide-react';

export default function AdminAbout() {
  const [content, setContent] = useState({ title: '', description: '', imageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall('/content/about');
      setContent(response);
    } catch (err) {
      console.error('Failed to load about content:', err);
      setError('Failed to load content.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      setError(null);
      setSuccess(null);
      await apiCall('/content/about', 'PUT', content);
      setSuccess('About page content updated successfully.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to update about content:', err);
      setError('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-8">Loading...</div>;

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
            value={content.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            rows="6"
            value={content.description}
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
