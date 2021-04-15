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
        target: "http://netease-cloud-music-api-one-hazel.vercel.app:443",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace("/api", '');
        }
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
