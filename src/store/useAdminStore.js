import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// --- ROBUST API CONFIGURATION ---
// Log the env variable at build time to see what Netlify is providing.
console.log(`VITE_API_URL from env: "${import.meta.env.VITE_API_URL}"`);

// If VITE_API_URL is undefined, null, or an empty string, default to '/api'.
const API_URL = import.meta.env.VITE_API_URL || '/api';

console.log(`Final API_URL used: "${API_URL}"`);
// --- END OF ROBUST API CONFIGURATION ---

const api = axios.create({
  baseURL: API_URL,
});

const useAdminStore = create(
  persist(
    (set, get) => ({
      isAdmin: false,
      token: null,
      apiCall: async (endpoint, method = 'GET', data = null) => {
        try {
          const response = await api({
            url: endpoint,
            method,
            data,
            headers: {
              ...(get().token && { Authorization: `Bearer ${get().token}` }),
            },
          });
          return response.data;
        } catch (error) {
          console.error('API call failed:', error.response || error.message);
          if (error.response && error.response.status === 401) {
            // Token is invalid or expired, log out
            set({ isAdmin: false, token: null });
          }
          throw error;
        }
      },
      login: async (credentials) => {
        const { token } = await get().apiCall('/auth/login', 'POST', credentials);
        if (token) {
          set({ isAdmin: true, token });
        }
      },
      logout: () => {
        set({ isAdmin: false, token: null });
      },
    }),
    {
      name: 'admin-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useAdminStore;
