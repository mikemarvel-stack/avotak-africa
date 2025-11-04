
import { useState, useEffect } from 'react';
import api from '../utils/api'; // Assuming you have a central API utility

export default function usePublicContent(endpoint, initialContent = {}) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(endpoint);
        setContent(response.data);
      } catch (err) {
        console.error(`Failed to fetch content from ${endpoint}:`, err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [endpoint]);

  return { content, loading, error };
}
