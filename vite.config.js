import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import rollupConfig from './rollup.config.js';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    watch: {
        include: ['src/**/*.jsx', 'src/**/*.js'],
    },
    manifest: true,
    sourcemap: true,
    emptyOutDir: true,
    modulePreload: false,
    outDir: 'dist/',
    assetsDir: 'js',
    input: './src/index.jsx',
    rollupOptions: rollupConfig
},
});