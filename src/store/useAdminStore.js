import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api, { setAuthToken } from '../services/api';

const useAdminStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAdmin: false,
      error: null,

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

      logout: () => {
        setAuthToken(null);
        set({ token: null, isAdmin: false, error: null });
      },

      checkAuth: () => {
        const token = get().token;
        if (token) setAuthToken(token) && set({ isAdmin: true });
        else set({ isAdmin: false });
      },

      apiCall: async (endpoint, method = 'GET', body = null) => {
        try {
          const config = { method, url: endpoint };
          if (body) config.data = body;
          const response = await api(config);
          return response.data;
        } catch (err) {
          const message = err.response?.data?.message || `Error ${method} ${endpoint}`;
          console.error(message, err.response || err);
          throw new Error(message);
        }
      },
    }),
    { name: 'admin-storage' }
  )
);

useAdminStore.getState().checkAuth();

export default useAdminStore;
