import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminStore from '../../store/useAdminStore';

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
    setProduceList(prev => [...prev, { name: '', description: '', price: 0 }]);
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
        if (!produce.name || !produce.description) {
          toast.error('Please fill all required fields', { id: toastId });
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

      <div className="space-y-4">
        {produceList.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleUpdateProduce(index, 'name', e.target.value)}
              placeholder="Name"
              className="flex-1 rounded border-gray-300 p-2"
            />
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleUpdateProduce(index, 'description', e.target.value)}
              placeholder="Description"
              className="flex-2 rounded border-gray-300 p-2"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleUpdateProduce(index, 'price', parseFloat(e.target.value))}
              placeholder="Price"
              className="flex-1 rounded border-gray-300 p-2"
            />
            <button
              onClick={() => handleRemoveProduce(index)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
              aria-label="Remove produce item"
            >
              <Trash2 className="w-4 h-4" /> Remove
            </button>
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
