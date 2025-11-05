import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api, { setAuthToken } from '../services/api';

const useAdminStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAdmin: false,
      error: null,

      // -------------------- LOGIN --------------------
      login: async (email, password) => {
        try {
          set({ error: null });
          const response = await api.post('/auth/login', { email, password });
          const { token } = response.data;
          setAuthToken(token);
          set({ token, isAdmin: true });
          return true;
        } catch (err) {
          const errorMsg = err.response?.data?.message || 'Login failed';
          set({ error: errorMsg });
          return false;
        }
      },

      // -------------------- LOGOUT --------------------
      logout: () => {
        setAuthToken(null);
        set({ token: null, isAdmin: false, error: null });
      },

      // -------------------- CHECK AUTH --------------------
      checkAuth: () => {
        const token = get().token;
        if (token) {
          setAuthToken(token);
          set({ isAdmin: true });
        } else {
          set({ isAdmin: false });
        }
      },

      // -------------------- GENERIC API CALL --------------------
      apiCall: async (endpoint, method = 'GET', body = null) => {
        try {
          const config = { method, url: endpoint };
          if (body) {
            config.data = body;
            // Handle FormData for file uploads
            if (body instanceof FormData) {
              config.headers = { 'Content-Type': 'multipart/form-data' };
            }
          }
          const response = await api(config);
          return response.data;
        } catch (err) {
          const message = err.response?.data?.message || `Error ${method} ${endpoint}`;
          console.error(message, err.response || err);
          throw new Error(message);
        }
      },

      // -------------------- SPECIFIC CRUD HELPERS --------------------
      fetchServices: () => get().apiCall('/content/services'),
      addService: (data) => get().apiCall('/content/services', 'POST', data),
      updateService: (id, data) => get().apiCall(`/content/services/${id}`, 'PUT', data),
      deleteService: (id) => get().apiCall(`/content/services/${id}`, 'DELETE', null),

      fetchProjects: () => get().apiCall('/content/projects'),
      addProject: (data) => get().apiCall('/content/projects', 'POST', data),
      updateProject: (id, data) => get().apiCall(`/content/projects/${id}`, 'PUT', data),
      deleteProject: (id) => get().apiCall(`/content/projects/${id}`, 'DELETE', null),

      fetchProduce: () => get().apiCall('/content/produce'),
      addProduce: (data) => get().apiCall('/content/produce', 'POST', data),
      updateProduce: (id, data) => get().apiCall(`/content/produce/${id}`, 'PUT', data),
      deleteProduce: (id) => get().apiCall(`/content/produce/${id}`, 'DELETE', null),

      fetchGallery: () => get().apiCall('/content/gallery'),
      addGalleryItem: (data) => get().apiCall('/content/gallery', 'POST', data),
      updateGalleryItem: (id, data) => get().apiCall(`/content/gallery/${id}`, 'PUT', data),
      deleteGalleryItem: (id) => get().apiCall(`/content/gallery/${id}`, 'DELETE', null),
    }),
    { name: 'admin-storage' }
  )
);

// Initialize auth token if stored
useAdminStore.getState().checkAuth();

export default useAdminStore;
