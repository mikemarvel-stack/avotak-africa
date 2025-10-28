import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api'; // Import the shared api instance

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
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          set({ token, isAdmin: true });
          return true;
        } catch (err) {
          const errorMsg =
            err.response?.data?.message || 'Login failed. Please try again.';
          console.error('API call failed:', err.response || err);
          set({ error: errorMsg });
          return false;
        }
      },
      logout: () => {
        delete api.defaults.headers.common['Authorization'];
        set({ token: null, isAdmin: false, error: null });
      },
      checkAuth: () => {
        const token = get().token;
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          set({ isAdmin: true });
        } else {
          set({ isAdmin: false });
        }
      },
    }),
    {
      name: 'admin-storage', // name of the item in the storage (must be unique)
    }
  )
);

// Initialize auth state on app load
useAdminStore.getState().checkAuth();

export default useAdminStore;
