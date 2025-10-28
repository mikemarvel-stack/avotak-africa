import React, { useState, useEffect } from 'react';
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
    const produce = produceList[index];
    if (produce._id) {
      try {
        await apiCall(`/content/produce/${produce._id}`, 'DELETE');
      } catch (err) {
        console.error('Failed to delete produce:', err);
        alert('Failed to delete produce.');
        return;
      }
    }
    setProduceList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setError(null);
      for (const produce of produceList) {
        if (produce._id) {
          await apiCall(`/content/produce/${produce._id}`, 'PUT', produce);
        } else {
          await apiCall('/content/produce', 'POST', produce);
        }
      }
      alert('Produce saved successfully.');
      loadProduce();
    } catch (err) {
      console.error('Failed to save produce:', err);
      setError('Failed to save produce.');
    }
  };

  if (loading) return <div className="p-4">Loading produce...</div>;

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
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleAddProduce}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Produce
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
