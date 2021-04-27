import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

const path = require('path');

export default defineConfig({
  base: '/mlog/',
  server: {
    port: 3080,
    strictPort: true,
    open: true
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '/src')
    }
  },
  css: {
    postcss: {},
    modules: {
      localsConvention: "camelCaseOnly"
    }
  },
  build: {
    rollupOptions: {
      input: {
         main: resolve(__dirname, 'index.html'),
         nested: resolve(__dirname, "nested/index.html")
      }
    }
  },
  plugins: [vue()]
})
