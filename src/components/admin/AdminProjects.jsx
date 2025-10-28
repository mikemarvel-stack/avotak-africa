import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall('/content/services');
      setServices(data);
    } catch (err) {
      console.error('Failed to load services:', err);
      setError('Failed to load services.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setServices(prev => [...prev, { title: '', description: '' }]);
  };

  const handleUpdateService = (index, field, value) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleRemoveService = async (index) => {
    const service = services[index];
    if (service._id) {
      try {
        await apiCall(`/content/services/${service._id}`, 'DELETE');
      } catch (err) {
        console.error('Failed to delete service:', err);
        alert('Failed to delete service.');
        return;
      }
    }
    setServices(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setError(null);
      for (const service of services) {
        if (service._id) {
          await apiCall(`/content/services/${service._id}`, 'PUT', service);
        } else {
          await apiCall('/content/services', 'POST', service);
        }
      }
      alert('Services saved successfully.');
      loadServices();
    } catch (err) {
      console.error('Failed to save services:', err);
      setError('Failed to save services.');
    }
  };

  if (loading) return <div className="p-4">Loading services...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <input
              type="text"
              value={service.title}
              onChange={(e) => handleUpdateService(index, 'title', e.target.value)}
              placeholder="Title"
              className="flex-1 rounded border-gray-300 p-2"
            />
            <input
              type="text"
              value={service.description}
              onChange={(e) => handleUpdateService(index, 'description', e.target.value)}
              placeholder="Description"
              className="flex-2 rounded border-gray-300 p-2"
            />
            <button
              onClick={() => handleRemoveService(index)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleAddService}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Service
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
