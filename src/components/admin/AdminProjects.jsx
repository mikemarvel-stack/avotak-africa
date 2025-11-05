import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminStore from '../../store/useAdminStore';
import ImageUpload from './ImageUpload';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall('/content/projects');
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load projects:', err);
      setError('Failed to load projects.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setProjects(prev => [...prev, { 
      title: '', 
      description: '', 
      category: '',
      impact: '',
      date: '',
      imageUrl: '',
      tags: [] 
    }]);
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleRemoveProject = async (index) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const project = projects[index];
    if (project._id) {
      const toastId = toast.loading('Deleting...');
      try {
        await apiCall(`/content/projects/${project._id}`, 'DELETE');
        toast.success('Deleted successfully', { id: toastId });
      } catch (err) {
        console.error('Failed to delete project:', err);
        toast.error('Failed to delete project', { id: toastId });
        return;
      }
    }
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const toastId = toast.loading('Saving changes...');
    try {
      setError(null);
      for (const project of projects) {
        if (!project.title || !project.description) {
          toast.error('Please fill all required fields', { id: toastId });
          return;
        }
        if (project._id) {
          await apiCall(`/content/projects/${project._id}`, 'PUT', project);
        } else {
          await apiCall('/content/projects', 'POST', project);
        }
      }
      toast.success('Saved successfully!', { id: toastId });
      await loadProjects();
    } catch (err) {
      console.error('Failed to save projects:', err);
      toast.error('Failed to save changes', { id: toastId });
      setError('Failed to save projects.');
    }
  };

  if (loading) return <div className="p-4 flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Project title"
                  aria-label={`Project ${index + 1} title`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={project.category || ''}
                  onChange={(e) => handleUpdateProject(index, 'category', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Agriculture, Export"
                  aria-label={`Project ${index + 1} category`}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={project.description || ''}
                onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Project description"
                aria-label={`Project ${index + 1} description`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                <input
                  type="text"
                  value={project.impact || ''}
                  onChange={(e) => handleUpdateProject(index, 'impact', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., 150 farmers trained"
                  aria-label={`Project ${index + 1} impact`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  value={project.date || ''}
                  onChange={(e) => handleUpdateProject(index, 'date', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Jan 2024 - Mar 2024"
                  aria-label={`Project ${index + 1} date`}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <ImageUpload onImageUploaded={(url) => handleUpdateProject(index, 'imageUrl', url)} />
              {project.imageUrl && (
                <img src={project.imageUrl} alt={project.title} className="mt-2 h-32 w-auto object-cover rounded-md" />
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleRemoveProject(index)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                aria-label="Remove project"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleAddProject}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}
