import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        // target: "http://localhost:3000",
        target: "https://x-fit-backend-graduation-project.onrender.com",
        changeOrigin: true,
        ws: true
      }
    }
  }
});