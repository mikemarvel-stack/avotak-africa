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
          setAuthToken(token); // Use the helper to set the token
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
        setAuthToken(null); // Use the helper to clear the token
        set({ token: null, isAdmin: false, error: null });
      },
      checkAuth: () => {
        const token = get().token;
        if (token) {
          setAuthToken(token); // Use the helper to set the token on app load
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

// Initialize auth state on load
useAdminStore.getState().checkAuth();

export default useAdminStore;
