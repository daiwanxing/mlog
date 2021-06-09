import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

const path = require('path');

export default defineConfig({
  base: '/mlog/',
  server: {
    port: 3080,
    strictPort: true,
    open: '/mlog/',
    hmr: {
      timeout: 100000
    }
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
         notFound: resolve(__dirname, "404.html")
      }
    }
  },
  plugins: [vue()]
})
