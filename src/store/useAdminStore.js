import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : 'https://avotak-backend.onrender.com/api';

const useAdminStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAdmin: false,
      error: null,

      login: async (email, password) => {
        try {
          const response = await axios.post(`${API_URL}/auth/login`, {
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
            url: `${API_URL}${endpoint}`,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            data,
          };
          const response = await axios(config);
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
