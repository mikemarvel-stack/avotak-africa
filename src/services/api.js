
import axios from 'axios';

// Use VITE_API_BASE from .env, otherwise default to the Render URL for development
// or other environments where the proxy isn't used.
const baseURL =
  import.meta.env.VITE_API_BASE || 'https://avotak-africa.onrender.com/api';

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export default api;
