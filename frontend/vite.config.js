import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    
    react(),
    tailwindcss(),
    
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your backend server URL
        changeOrigin: true,
        secure: false, // Set to `true` if using HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove "/api" prefix before forwarding
      },
    },
  },
});

