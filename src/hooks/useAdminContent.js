
import { useState, useEffect, useCallback } from 'react';
import useAdminStore from '../store/useAdminStore';

export default function useAdminContent(endpoint, initialContent = {}) {
  const [content, setContent] = useState(initialContent);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiCall = useAdminStore(state => state.apiCall);

  const loadContent = useCallback(async () => {
    if (!endpoint) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(endpoint);
      setContent({ ...initialContent, ...response });
    } catch (err) {
      console.error(`Failed to load content from ${endpoint}:`, err);
      setError('Failed to load content. Using default values.');
      setContent(initialContent);
    } finally {
      setLoading(false);
    }
  }, [apiCall, endpoint]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      setError(null);
      setSuccess(null);
      await apiCall(endpoint, 'PUT', content);
      await loadContent();
      setSuccess('Content updated successfully.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(`Failed to update content at ${endpoint}:`, err);
      setError('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await apiCall('/content/services');
      setServices(response.services || []);
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateServices = async (servicesData) => {
    try {
      await apiCall('/content/services', 'PUT', { services: servicesData });
      return true;
    } catch (err) {
      console.error('Failed to update services:', err);
      throw err;
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await apiCall('/content/projects');
      setProjects(response.projects || []);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProjects = async (projectsData) => {
    try {
      await apiCall('/content/projects', 'PUT', { projects: projectsData });
      return true;
    } catch (err) {
      console.error('Failed to update projects:', err);
      throw err;
    }
  };

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await apiCall('/content/gallery');
      setGallery(response.images || response || []);
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const addGalleryImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      await apiCall('/content/gallery', 'POST', formData);
      return true;
    } catch (err) {
      console.error('Failed to add gallery image:', err);
      throw err;
    }
  };

  const deleteGalleryImage = async (id) => {
    try {
      await apiCall(`/content/gallery/${id}`, 'DELETE');
      return true;
    } catch (err) {
      console.error('Failed to delete gallery image:', err);
      throw err;
    }
  };

  return {
    content,
    setContent,
    services,
    projects,
    gallery,
    loading,
    saving,
    error,
    success,
    handleSubmit,
    fetchServices,
    updateServices,
    fetchProjects,
    updateProjects,
    fetchGallery,
    addGalleryImage,
    deleteGalleryImage,
  };
}
