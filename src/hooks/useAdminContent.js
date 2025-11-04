
import { useState, useEffect, useCallback } from 'react';
import useAdminStore from '../store/useAdminStore';

export default function useAdminContent(endpoint, initialContent = {}) {
  const [content, setContent] = useState(initialContent);
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
      setError('Failed to load content.');
    } finally {
      setLoading(false);
    }
  }, [apiCall, endpoint, initialContent]);

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
      await loadContent(); // Re-fetch content to ensure UI is in sync with DB
      setSuccess('Content updated successfully.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(`Failed to update content at ${endpoint}:`, err);
      setError('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  return {
    content,
    setContent,
    loading,
    saving,
    error,
    success,
    handleSubmit,
  };
}
