import useAdminStore from '../../store/useAdminStore';
import React, { useState, useEffect } from 'react';

const emptyProject = {
  title: '',
  description: '',
  imageUrl: '',
  category: '',
  client: '',
  completionDate: '',
  features: [],
  order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null); // can be a project object or {} for a new one
  const [formState, setFormState] = useState(emptyProject);
  const [loading, setLoading] = useState(true);
  const apiCall = useAdminStore(state => state.apiCall);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (editingProject) {
      setFormState({ ...emptyProject, ...editingProject });
    } else {
      setFormState(emptyProject);
    }
  }, [editingProject]);

  const loadProjects = async () => {
    try {
      const data = await apiCall('/content/projects');
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setEditingProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      ...formState,
      features: Array.isArray(formState.features) 
        ? formState.features 
        : formState.features.split(',').map(f => f.trim()).filter(Boolean),
      order: parseInt(formState.order, 10) || 0,
    };

    try {
      if (editingProject && editingProject._id) {
        await apiCall(`/content/projects/${editingProject._id}`, 'PUT', projectData);
      } else {
        await apiCall('/content/projects', 'POST', projectData);
      }
      loadProjects();
      setEditingProject(null); // This will hide the form and clear it
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await apiCall(`/content/projects/${id}`, 'DELETE');
      loadProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button
          onClick={() => setEditingProject({})} // Use an empty object for a new project
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add New Project
        </button>
      </div>

      {/* Edit/Add Form */}
      {(editingProject !== null) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingProject._id ? 'Edit Project' : 'Add New Project'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                name="title"
                value={formState.title}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                name="category"
                value={formState.category}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formState.description}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                name="imageUrl"
                type="url"
                value={formState.imageUrl}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Client</label>
              <input
                name="client"
                value={formState.client}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Completion Date</label>
              <input
                name="completionDate"
                type="date"
                value={formState.completionDate ? formState.completionDate.split('T')[0] : ''}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Order</label>
              <input
                name="order"
                type="number"
                value={formState.order}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
              <input
                name="features"
                value={formState.features.join(', ')}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
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
              Save
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
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
            <div className="text-sm text-gray-500 mb-4">
              <p>Category: {project.category}</p>
              {project.client && <p>Client: {project.client}</p>}
              {project.completionDate && (
                <p>Completed: {new Date(project.completionDate).toLocaleDateString()}</p>
              )}
            </div>
            {project.features?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-1">Features:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingProject(project)}
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