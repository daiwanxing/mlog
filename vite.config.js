import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

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
  plugins: [vue()]
})
