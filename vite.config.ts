import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupOptions from './rollup.config';

import path from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  define: {
    'import.meta.env': process.env,
  },
  base: './',
  server: {
    port: 3000,
    cors: true,
    open: true,
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: rollupOptions,
  },
});
