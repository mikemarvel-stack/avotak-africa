
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
    let mounted = true;
    if (mounted) {
      loadContent();
    }
    return () => { mounted = false; };
  }, []);

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
    await apiCall('/content/services', 'PUT', { services: servicesData });
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
    await apiCall('/content/projects', 'PUT', { projects: projectsData });
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
    const formData = new FormData();
    formData.append('image', file);
    await apiCall('/content/gallery', 'POST', formData);
  };

  const deleteGalleryImage = async (id) => {
    await apiCall(`/content/gallery/${id}`, 'DELETE');
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
