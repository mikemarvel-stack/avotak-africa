import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminStore from '../../store/useAdminStore';
import ImageUpload from './ImageUpload';

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall('/content/gallery');
      setGallery(data);
    } catch (err) {
      console.error('Failed to load gallery:', err);
      setError('Failed to load gallery.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setGallery(prev => [...prev, { url: '', caption: '', publicId: '' }]);
  };

  const handleUpdateItem = (index, field, value) => {
    const updated = [...gallery];
    updated[index] = { ...updated[index], [field]: value };
    setGallery(updated);
  };

  const handleRemoveItem = async (index) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    
    const item = gallery[index];
    if (item._id) {
      const toastId = toast.loading('Deleting...');
      try {
        await apiCall(`/content/gallery/${item._id}`, 'DELETE');
        toast.success('Deleted successfully', { id: toastId });
      } catch (err) {
        console.error('Failed to delete item:', err);
        toast.error('Failed to delete item', { id: toastId });
        return;
      }
    }
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const toastId = toast.loading('Saving changes...');
    try {
      setError(null);
      for (const item of gallery) {
        if (!item.url) {
          toast.error('Please upload an image for all items', { id: toastId });
          return;
        }
        if (item._id) {
          await apiCall(`/content/gallery/${item._id}`, 'PUT', item);
        } else {
          await apiCall('/content/gallery', 'POST', item);
        }
      }
      toast.success('Saved successfully!', { id: toastId });
      await loadGallery();
    } catch (err) {
      console.error('Failed to save gallery:', err);
      toast.error('Failed to save changes', { id: toastId });
      setError('Failed to save gallery.');
    }
  };

  if (loading) return <div className="p-4 flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      <div className="space-y-4">
        {gallery.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-start">
            <div className="flex flex-col">
              <ImageUpload onImageUploaded={(url) => handleUpdateItem(index, 'url', url)} />
              {item.url && (
                <img src={item.url} alt={`Gallery ${index + 1}`} className="h-24 w-24 object-cover rounded mt-2" />
              )}
            </div>
            <input
              type="text"
              value={item.caption}
              onChange={(e) => handleUpdateItem(index, 'caption', e.target.value)}
              placeholder="Caption"
              className="flex-1 rounded border-gray-300 p-2"
            />
            <button
              onClick={() => handleRemoveItem(index)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
              aria-label="Remove gallery item"
            >
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
