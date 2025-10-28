import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import useAdminStore from '../../store/useAdminStore';

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const apiCall = useAdminStore((state) => state.apiCall);

  // 🔹 Fetch all gallery items
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/content/gallery', 'GET');
      setGallery(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load gallery items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // 🔹 Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Image upload handler
  const handleImageUpload = (url) => {
    setCurrentItem((prev) => ({ ...prev, imageUrl: url }));
  };

  // 🔹 Submit new or edited item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentItem?.imageUrl) {
      setError('Please upload an image before saving.');
      return;
    }
    try {
      setError(null);
      setSuccess(null);

      if (isEditing) {
        await apiCall(`/content/gallery/${currentItem._id}`, 'PUT', currentItem);
        setSuccess('Gallery item updated successfully!');
      } else {
        await apiCall('/content/gallery', 'POST', currentItem);
        setSuccess('Gallery item added successfully!');
      }

      await fetchGallery();
      handleCancel();
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save gallery item.');
    }
  };

  // 🔹 Edit handler
  const handleEdit = (item) => {
    setIsEditing(true);
    setIsFormVisible(true);
    setCurrentItem({ ...item });
    setError(null);
    setSuccess(null);
  };

  // 🔹 Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await apiCall(`/content/gallery/${id}`, 'DELETE');
      setSuccess('Gallery item deleted successfully.');
      await fetchGallery();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete gallery item.');
    }
  };

  // 🔹 Add new item
  const handleAddNew = () => {
    setIsEditing(false);
    setIsFormVisible(true);
    setCurrentItem({ title: '', description: '', category: '', imageUrl: '' });
    setError(null);
    setSuccess(null);
  };

  // 🔹 Cancel form
  const handleCancel = () => {
    setIsEditing(false);
    setIsFormVisible(false);
    setCurrentItem(null);
    setError(null);
  };

  if (loading) return <div className="p-8 text-gray-600">Loading gallery...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Gallery</h1>
        <button
          onClick={handleAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Add New Item
        </button>
      </div>

      {/* Notifications */}
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</div>}

      {/* Form */}
      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={currentItem.title || ''}
              onChange={handleInputChange}
              placeholder="Item Title"
              className="w-full p-2 border rounded-md"
              required
            />
            <textarea
              name="description"
              value={currentItem.description || ''}
              onChange={handleInputChange}
              placeholder="Item Description"
              className="w-full p-2 border rounded-md"
              rows="3"
            />
            <input
              name="category"
              value={currentItem.category || ''}
              onChange={handleInputChange}
              placeholder="Category (e.g., Farm, Produce)"
              className="w-full p-2 border rounded-md"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <ImageUpload onImageUploaded={handleImageUpload} />
              {currentItem.imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Preview:</p>
                  <img
                    src={currentItem.imageUrl}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-md mt-1"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {isEditing ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery List */}
      {gallery.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">No gallery items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-xs text-gray-500 mt-2">Category: {item.category}</p>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(item)}
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
          ))}
        </div>
      )}
    </div>
  );
}
