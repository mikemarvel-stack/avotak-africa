import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import { Loader2, Plus, Trash2 } from 'lucide-react';

// A list of available icons to choose from
const availableIcons = ['Leaf', 'Truck', 'GraduationCap', 'LineChart', 'Factory', 'Globe'];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/content/services');
      setServices(data);
    } catch (err) {
      setError('Failed to load services.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      // We'll assume a new endpoint or an updated one that accepts the whole array
      await apiCall('/content/services', 'PUT', { services });
      setSuccess('Services updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save services.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddService = () => {
    setServices([...services, { title: '', desc: '', icon: 'Leaf' }]);
  };

  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleUpdateService = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
  };

  if (loading) return <div className="p-4 flex justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <button onClick={handleAddService} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</div>}

      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => handleUpdateService(index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon</label>
                <select
                  value={service.icon}
                  onChange={(e) => handleUpdateService(index, 'icon', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  {availableIcons.map(iconName => (
                    <option key={iconName} value={iconName}>{iconName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={service.desc}
                onChange={(e) => handleUpdateService(index, 'desc', e.target.value)}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => handleRemoveService(index)} className="text-red-600 hover:text-red-800">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center">
          {saving && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}