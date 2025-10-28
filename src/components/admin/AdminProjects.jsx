import React, { useState, useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import ImageUpload from './ImageUpload';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const apiCall = useAdminStore(state => state.apiCall);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall('/content/projects');
      setProjects(response.data || response); // ensure we get the array
    } catch (err) {
      setError('Failed to fetch projects.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentProject.title || !currentProject.imageUrl) {
      setError('Title and Image are required.');
      return;
    }
    try {
      setError(null);
      if (isEditing) {
        await apiCall(`/content/projects/${currentProject._id}`, 'PUT', currentProject);
      } else {
        await apiCall('/content/projects', 'POST', currentProject);
      }
      await fetchProjects(); // Refresh the list
      handleCancel();
    } catch (err) {
      setError('Failed to save project.');
      console.error(err);
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setCurrentProject(project);
    setIsFormVisible(true);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setError(null);
        await apiCall(`/content/projects/${id}`, 'DELETE');
        await fetchProjects(); // Refresh the list
      } catch (err) {
        setError('Failed to delete project.');
        console.error(err);
      }
    }
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentProject({ title: '', description: '', imageUrl: '', category: '' });
    setIsFormVisible(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentProject(null);
    setIsFormVisible(false);
    setError(null);
  };

  if (loading) return <div className="p-8">Loading projects...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button
          onClick={handleAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add New Project
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={currentProject.title}
              onChange={handleInputChange}
              placeholder="Project Title"
              className="w-full p-2 border rounded-md"
              required
            />
            <textarea
              name="description"
              value={currentProject.description}
              onChange={handleInputChange}
              placeholder="Project Description"
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            />

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
              <ImageUpload
                onImageUploaded={(url) => {
                  setCurrentProject(prev => ({ ...prev, imageUrl: url }));
                }}
              />
              {currentProject.imageUrl && (
                <img
                  src={currentProject.imageUrl}
                  alt="Current"
                  className="h-24 w-24 object-cover rounded mt-2"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                name="category"
                value={currentProject.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., Farm Management, Crop Consulting"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {isEditing ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-lg mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <p className="text-gray-500 text-sm mb-2">Category: {project.category}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
