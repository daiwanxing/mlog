import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');

export default defineConfig({
  base: '/mlog/',
  server: {
    strictPort: true,
    open: true
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '/src')
    }
  },
  plugins: [vue()]
})
