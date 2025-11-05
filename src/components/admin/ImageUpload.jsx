import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import ImageUpload from './ImageUpload';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiCall = useAdminStore(state => state.apiCall);

  // Load gallery items
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall('/content/gallery');
      setItems(data);
    } catch (err) {
      console.error('Failed to load gallery items:', err);
      setError('Failed to load gallery items.');
    } finally {
      setLoading(false);
    }
  };

  // Add new empty gallery item
  const handleAddItem = () => {
    setItems(prev => [...prev, { title: '', url: '', description: '' }]);
  };

  // Update a field in a gallery item
  const handleUpdateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  // Remove a gallery item
  const handleRemoveItem = async (index) => {
    const item = items[index];
    if (item._id) {
      try {
        await apiCall(`/content/gallery/${item._id}`, 'DELETE');
      } catch (err) {
        console.error('Failed to delete gallery item:', err);
        alert('Failed to delete item.');
        return;
      }
    }
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // Save all gallery items (create or update)
  const handleSave = async () => {
    try {
      setError(null);
      for (const item of items) {
        if (item._id) {
          await apiCall(`/content/gallery/${item._id}`, 'PUT', item);
        } else {
          await apiCall('/content/gallery', 'POST', item);
        }
      }
      alert('Gallery items saved successfully.');
      loadItems();
    } catch (err) {
      console.error('Failed to save gallery items:', err);
      setError('Failed to save gallery items.');
    }
  };

  if (loading) return <div className="p-4">Loading gallery...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleUpdateItem(index, 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                aria-label={`Gallery item ${index + 1} title`}
              />
            </div>
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                aria-label={`Gallery item ${index + 1} description`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <ImageUpload
                existingUrl={item.url}
                onImageUploaded={(url) => handleUpdateItem(index, 'url', url)}
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 self-start md:self-auto"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={handleAddItem}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add New Item
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
