import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminContent from '../../hooks/useAdminContent';

export default function AdminServices() {
  const { services, loading, fetchServices, updateServices } = useAdminContent();
  const [editingServices, setEditingServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      setEditingServices(services);
    }
  }, [services]);

  const handleAdd = () => {
    setEditingServices([...editingServices, { title: '', description: '', icon: 'Briefcase' }]);
    setIsEditing(true);
  };

  const handleChange = (index, field, value) => {
    const updated = [...editingServices];
    updated[index][field] = value;
    setEditingServices(updated);
  };

  const handleDelete = (index) => {
    setEditingServices(editingServices.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      await updateServices(editingServices);
      toast.success('Services updated successfully');
      setIsEditing(false);
      await fetchServices();
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to update services');
    }
  };

  const handleCancel = () => {
    setEditingServices(services);
    setIsEditing(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Edit2 className="w-4 h-4" />
            Edit Services
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {editingServices.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  placeholder="Service Title"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  value={service.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="Service Description"
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => handleDelete(index)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {isEditing && (
        <button
          onClick={handleAdd}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      )}
    </div>
  );
}
