import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import ImageUpload from './ImageUpload';

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiCall = useAdminStore(state => state.apiCall);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const data = await apiCall('/content/gallery');
      setGallery(data);
    } catch (error) {
      console.error('Failed to load gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUploaded = (imageData) => {
    // Pre-fill the form with the uploaded image URL
    setEditingItem({
      imageUrl: imageData.url,
      caption: '',
      category: '',
      order: 0
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemData = {
      imageUrl: formData.get('imageUrl'),
      caption: formData.get('caption'),
      category: formData.get('category'),
      order: parseInt(formData.get('order'), 10)
    };

    try {
      if (editingItem) {
        await apiCall(`/content/gallery/${editingItem._id}`, 'PUT', itemData);
      } else {
        await apiCall('/content/gallery', 'POST', itemData);
      }
      loadGallery();
      setEditingItem(null);
    } catch (error) {
      console.error('Failed to save gallery item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await apiCall(`/content/gallery/${id}`, 'DELETE');
      loadGallery();
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  const categories = [...new Set(gallery.map(item => item.category))].filter(Boolean);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Gallery</h1>
        <button
          onClick={() => setEditingItem(null)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add New Image
        </button>
      </div>

      {/* Edit/Add Form */}
      {(editingItem !== null) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
              <ImageUpload onImageUploaded={handleImageUploaded} />
              
              <label className="block text-sm font-medium text-gray-700 mt-4">Image URL</label>
              <input
                name="imageUrl"
                type="url"
                defaultValue={editingItem?.imageUrl}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Caption</label>
              <input
                name="caption"
                defaultValue={editingItem?.caption}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                name="category"
                defaultValue={editingItem?.category}
                list="categories"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              <datalist id="categories">
                {categories.map(cat => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Order</label>
              <input
                name="order"
                type="number"
                defaultValue={editingItem?.order || 0}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(item => (
          <div key={item._id} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.caption}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="space-x-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            {(item.caption || item.category) && (
              <div className="p-2 text-sm">
                {item.caption && <p className="font-medium">{item.caption}</p>}
                {item.category && <p className="text-gray-500">{item.category}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}