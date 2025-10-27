import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.npm_lifecycle_event === 'build:github' 
    ? '/avotak-africa/' 
    : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,  // Enable source maps for debugging
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          animations: ['framer-motion']
        }
      }
    }
  },
  server: {
    host: true,
    port: 3002  // Use port 3002 since 3000 and 3001 are in use
  }
})