import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// Ensure API_URL is always a valid string, defaulting to a relative path.
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

const useAdminStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAdmin: false,
      error: null,

      login: async (email, password) => {
        try {
          const response = await api.post(`/auth/login`, {
            email,
            password,
          });
          const { token } = response.data;
          set({ token, isAdmin: true, error: null });
          return true;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Login failed',
            isAdmin: false,
          });
          return false;
        }
      },

      logout: () => {
        set({ token: null, isAdmin: false });
      },

      apiCall: async (endpoint, method = 'GET', data = null) => {
        const { token } = get();
        try {
          const config = {
            method,
            url: endpoint,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            data,
          };
          const response = await api(config);
          return response.data;
        } catch (error) {
          throw error.response?.data || error.message;
        }
      },
    }),
    { name: 'admin-storage' }
  )
);

export default useAdminStore;
