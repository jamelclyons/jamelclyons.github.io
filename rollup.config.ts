import { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';

import resolve from '@rollup/plugin-node-resolve';

const rollupConfig: RollupOptions = {
  input: 'src/index.tsx', // Use the entry point as index.tsx
  output: {
    dir: 'dist',
    entryFileNames: 'js/index.js',
    chunkFileNames: 'js/chunks/[name].[hash].js',
    assetFileNames: 'js/assets/[name].[hash].[ext]',
    format: 'esm',
    manualChunks: {
      vendor: ['react', 'react-dom', 'react-router-dom'], // Create a vendor chunk
    },
  },
  plugins: [
    resolve(),
    typescript(),
    react(),
  ],
};

export default rollupConfig;