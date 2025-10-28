import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import ImageUpload from './ImageUpload';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentService, setCurrentService] = useState({ title: '', description: '', icon: '' });
  const [isEditing, setIsEditing] = useState(false);
  const apiCall = useAdminStore(state => state.apiCall);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall('/content/services');
      setServices(response.data || response);
    } catch (err) {
      setError('Failed to fetch services.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentService.title) {
      setError('Service title is required.');
      return;
    }
    try {
      setError(null);
      if (isEditing) {
        await apiCall(`/content/services/${currentService._id}`, 'PUT', currentService);
      } else {
        await apiCall('/content/services', 'POST', currentService);
      }
      await fetchServices();
      resetForm();
    } catch (err) {
      setError('Failed to save service.');
      console.error(err);
    }
  };

  const handleEdit = (service) => {
    setIsEditing(true);
    setCurrentService(service);
    setIsFormVisible(true);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      setError(null);
      await apiCall(`/content/services/${id}`, 'DELETE');
      await fetchServices();
    } catch (err) {
      setError('Failed to delete service.');
      console.error(err);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentService({ title: '', description: '', icon: '' });
    setIsFormVisible(false);
    setError(null);
  };

  if (loading) return <div className="p-8">Loading services...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <button
          onClick={() => { resetForm(); setIsFormVisible(true); }}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add New Service
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Service' : 'Add New Service'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={currentService.title}
              onChange={handleInputChange}
              placeholder="Service Title"
              className="w-full p-2 border rounded-md"
              required
            />
            <textarea
              name="description"
              value={currentService.description}
              onChange={handleInputChange}
              placeholder="Service Description"
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            />

            {/* Icon / Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon/Image</label>
              <ImageUpload
                onImageUploaded={(url) => setCurrentService(prev => ({ ...prev, icon: url }))}
              />
              {currentService.icon && (
                <img
                  src={currentService.icon}
                  alt="Current Icon"
                  className="h-20 w-20 object-cover rounded mt-2"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {isEditing ? 'Update Service' : 'Add Service'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <div key={service._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-2">{service.description}</p>
            {service.icon && <img src={service.icon} alt={service.title} className="h-16 w-16 object-cover rounded mb-2" />}
            <div className="flex justify-end space-x-2">
              <button onClick={() => handleEdit(service)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
              <button onClick={() => handleDelete(service._id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
