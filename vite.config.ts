import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base './' is crucial for relative path loading on GitHub Pages
  base: './',
  define: {
    'process.env': {}
  }
});