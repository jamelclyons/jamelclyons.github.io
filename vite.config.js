import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';

import rollupConfig from './rollup.config.js';

export default defineConfig({
  plugins: [
    react(),
    reactRefresh()
  ],
  base: '/jamelclyons.github.io/',
  root: ".", // Set the root directory (main project directory)
  server: {
    port: 3000,         // Port for Vite dev server
    cors: true,         // Allow cross-origin requests
    open: false,        // Let BrowserSync handle opening the browser
    watch: {
      include: ['src/**/*.jsx', 'src/**/*.js'], // Watch changes in JSX files
    },
    historyApiFallback: true, // Ensures all routes fallback to index.html
  },
  build: {
    watch: {
      include: ['src/**/*.jsx', 'src/**/*.js'],
    },
    chunkSizeWarningLimit: 1000,
    manifest: true,
    sourcemap: true,
    emptyOutDir: true,
    modulePreload: false,
    outDir: 'dist/',
    assetsDir: 'js',
    input: 'index.html',
    rollupOptions: rollupConfig
  }
});