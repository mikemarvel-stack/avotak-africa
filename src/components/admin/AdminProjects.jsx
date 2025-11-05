import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminContent from '../../hooks/useAdminContent';

export default function AdminProjects() {
  const { projects, loading, fetchProjects, updateProjects } = useAdminContent(null);
  const [editingProjects, setEditingProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setEditingProjects(projects);
    }
  }, [projects]);

  const handleAdd = () => {
    setEditingProjects([...editingProjects, { 
      title: '', 
      description: '', 
      category: 'Export',
      impact: '',
      duration: ''
    }]);
    setIsEditing(true);
  };

  const handleChange = (index, field, value) => {
    const updated = [...editingProjects];
    updated[index][field] = value;
    setEditingProjects(updated);
  };

  const handleDelete = (index) => {
    setEditingProjects(editingProjects.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      await updateProjects(editingProjects);
      toast.success('Projects updated successfully');
      setIsEditing(false);
      await fetchProjects();
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to update projects');
    }
  };

  const handleCancel = () => {
    setEditingProjects(projects);
    setIsEditing(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Edit2 className="w-4 h-4" />
            Edit Projects
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {editingProjects.map((project, index) => (
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
                  value={project.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  placeholder="Project Title"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  value={project.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="Project Description"
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={project.category}
                  onChange={(e) => handleChange(index, 'category', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="Export">Export</option>
                  <option value="Training">Training</option>
                  <option value="Sustainability">Sustainability</option>
                </select>
                <input
                  type="text"
                  value={project.impact}
                  onChange={(e) => handleChange(index, 'impact', e.target.value)}
                  placeholder="Impact (e.g., 50+ farmers)"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  value={project.duration}
                  onChange={(e) => handleChange(index, 'duration', e.target.value)}
                  placeholder="Duration (e.g., 2023-2024)"
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{project.category}</span>
                  {project.impact && <span>{project.impact}</span>}
                  {project.duration && <span>{project.duration}</span>}
                </div>
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
          Add Project
        </button>
      )}
    </div>
  );
}
