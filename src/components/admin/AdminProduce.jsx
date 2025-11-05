import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminStore from '../../store/useAdminStore';
import ImageUpload from './ImageUpload';

export default function AdminProduce() {
  const [produceList, setProduceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadProduce();
  }, []);

  const loadProduce = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall('/content/produce');
      setProduceList(data);
    } catch (err) {
      console.error('Failed to load produce:', err);
      setError('Failed to load produce.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduce = () => {
    setProduceList(prev => [...prev, { name: '', description: '', category: 'Fruits', imageUrl: '' }]);
  };

  const handleUpdateProduce = (index, field, value) => {
    const updated = [...produceList];
    updated[index] = { ...updated[index], [field]: value };
    setProduceList(updated);
  };

  const handleRemoveProduce = async (index) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const produce = produceList[index];
    if (produce._id) {
      const toastId = toast.loading('Deleting...');
      try {
        await apiCall(`/content/produce/${produce._id}`, 'DELETE');
        toast.success('Deleted successfully', { id: toastId });
      } catch (err) {
        console.error('Failed to delete produce:', err);
        toast.error('Failed to delete item', { id: toastId });
        return;
      }
    }
    setProduceList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const toastId = toast.loading('Saving changes...');
    try {
      setError(null);
      for (const produce of produceList) {
        if (!produce.name || !produce.description || !produce.category) {
          toast.error('Please fill all required fields (name, description, category)', { id: toastId });
          return;
        }
        if (produce._id) {
          await apiCall(`/content/produce/${produce._id}`, 'PUT', produce);
        } else {
          await apiCall('/content/produce', 'POST', produce);
        }
      }
      toast.success('Saved successfully!', { id: toastId });
      await loadProduce();
    } catch (err) {
      console.error('Failed to save produce:', err);
      toast.error('Failed to save changes', { id: toastId });
      setError('Failed to save produce.');
    }
  };

  if (loading) return <div className="p-4 flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Produce</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      <div className="space-y-6">
        {produceList.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleUpdateProduce(index, 'name', e.target.value)}
                  placeholder="Product name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  aria-label={`Produce ${index + 1} name`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={item.category || 'Fruits'}
                  onChange={(e) => handleUpdateProduce(index, 'category', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  aria-label={`Produce ${index + 1} category`}
                >
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Herbs">Herbs</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={item.description || ''}
                onChange={(e) => handleUpdateProduce(index, 'description', e.target.value)}
                placeholder="Product description"
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md"
                aria-label={`Produce ${index + 1} description`}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <ImageUpload
                existingUrl={item.imageUrl}
                onImageUploaded={(url) => handleUpdateProduce(index, 'imageUrl', url)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleRemoveProduce(index)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                aria-label="Remove produce item"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleAddProduce}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Produce
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
