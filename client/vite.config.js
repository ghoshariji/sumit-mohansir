import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite config
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'global': 'window',
  },
});
