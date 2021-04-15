import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');

export default defineConfig({
  base: '/mlog/',
  server: {
    port: 8090,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: "http://localhost:3001",
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '/src')
    }
  },
  plugins: [vue()]
})
