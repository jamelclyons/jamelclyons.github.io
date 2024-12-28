import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env': {
      VITE_API_KEY: process.env.VITE_API_KEY,
      VITE_AUTH_DOMAIN: process.env.VITE_AUTH_DOMAIN,
      VITE_PROJECT_ID: process.env.VITE_PROJECT_ID,
      VITE_STORAGE_BUCKET: process.env.VITE_STORAGE_BUCKET,
    },
  },
  base: '/',
  root: '.',
  // server: {
  //   port: 3000,
  //   cors: true,
  //   open: false
  // },
  build: {
    watch: {
      include: ['src/**/*.jsx', 'src/**/*.js', 'src/**/*.tsx', 'src/**/*.ts'],
    },
    chunkSizeWarningLimit: 1000,
    manifest: true,
    sourcemap: true,
    emptyOutDir: true,
    modulePreload: false,
    outDir: 'dist/',
    assetsDir: 'js',
    target: 'esnext',
    rollupOptions: {
      input: 'src/index.tsx',
      output: {
        dir: 'dist/js',
        entryFileNames: '[name].js', 
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
});