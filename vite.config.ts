import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

const path = require('path');

export default defineConfig({
  base: '/mlog/',
  server: {
    port: 3080,
    strictPort: true,
    open: '/mlog/'
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
    assetsDir: 'asset/img/',
    rollupOptions: {
      input: {
         main: resolve(__dirname, 'index.html'),
         notFound: resolve(__dirname, "404.html")
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // chunkFileNames 是 通过dynamic import 引入的chunk
        entryFileNames: 'js/[name]-[hash].js', // 入口main.ts
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  plugins: [vue()]
});