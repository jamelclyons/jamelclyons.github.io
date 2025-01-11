import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupOptions from './rollup.config';

import path from 'path';

import typescript from '@rollup/plugin-typescript';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [react(), typescript({ tsconfig: './tsconfig.json' })],
  define: {
    'import.meta.env': process.env,
  },
  base: '/jamelclyons.github.io/',
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
