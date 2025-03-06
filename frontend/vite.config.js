import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      proxy: {
        '/api': env.VITE_API_URL || 'http://localhost:5000',
      },
    },
    build: {
      outDir: '../backend/dist',
      emptyOutDir: true,
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});