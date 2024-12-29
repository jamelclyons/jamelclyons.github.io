import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupOptions from './rollup.config';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env': process.env,
  },
  base: '/',
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
    chunkSizeWarningLimit: 1000,
    manifest: true,
    sourcemap: true,
    emptyOutDir: true,
    modulePreload: false,
    outDir: 'dist/',
    assetsDir: 'js',
    target: 'esnext',
    rollupOptions: rollupOptions,
  },
});
