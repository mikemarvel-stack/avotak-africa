// src/store/useAdminStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api, { setAuthToken } from '../services/api';

const useAdminStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAdmin: false,
      error: null,
      loading: false, // centralized loading state

      // 🔹 Login admin
      login: async (email, password) => {
        set({ error: null, loading: true });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { token } = response.data;
          setAuthToken(token);
          set({ token, isAdmin: true });
          return true;
        } catch (err) {
          const errorMsg =
            err.response?.data?.message || 'Login failed. Please try again.';
          set({ error: errorMsg });
          console.error('Login error:', err.response || err);
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // 🔹 Logout admin
      logout: () => {
        setAuthToken(null);
        set({ token: null, isAdmin: false, error: null });
      },

      // 🔹 Restore session from persisted token
      checkAuth: () => {
        const token = get().token;
        if (token) {
          setAuthToken(token);
          set({ isAdmin: true });
        } else {
          set({ isAdmin: false });
        }
      },

      // 🔹 Centralized API call wrapper with loading & error
      apiCall: async (endpoint, method = 'GET', body = null) => {
        set({ loading: true, error: null });
        try {
          const config = { method, url: endpoint };
          if (body) config.data = body;
          const response = await api(config);
          return response.data;
        } catch (err) {
          const message =
            err.response?.data?.message ||
            `Error during ${method} ${endpoint}`;
          console.error(`[API Error] ${message}`, err.response || err);
          set({ error: message });
          throw new Error(message);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);

// Initialize token on load
useAdminStore.getState().checkAuth();

export default useAdminStore;
