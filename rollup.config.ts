import { RollupOptions } from 'rollup';

const rollupConfig: RollupOptions = {
  input: './index.html',
  output: {
    dir: 'dist',
    entryFileNames: 'js/index.js',
    chunkFileNames: 'js/chunks/[name].[hash].js',
    assetFileNames: 'js/assets/[name].[hash].[ext]',
    format: 'esm',
    sourcemap: true,
  },
  external: ['react', 'react-dom'], // Keep this if using external CDNs
};

export default rollupConfig;