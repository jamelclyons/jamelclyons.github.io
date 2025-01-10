import { RollupOptions } from 'rollup';

const rollupConfig: RollupOptions = {
  input: './index.html',
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
};

export default rollupConfig;