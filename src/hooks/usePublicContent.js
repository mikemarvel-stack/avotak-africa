
import { useState, useEffect } from 'react';
import api from '../utils/api'; // Assuming you have a central API utility

export default function usePublicContent(endpoint, initialContent = {}) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(endpoint);
        if (mounted) {
          setContent(response.data || initialContent);
        }
      } catch (err) {
        console.error(`Failed to fetch content from ${endpoint}:`, err);
        if (mounted) {
          setError('Failed to load content. Please try again later.');
          setContent(initialContent);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchContent();
    return () => { mounted = false; };
  }, [endpoint]);

  return { content, loading, error };
}
