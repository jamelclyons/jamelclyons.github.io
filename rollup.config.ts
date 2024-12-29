import { RollupOptions } from 'rollup';

const rollupConfig: RollupOptions = {
  input: './index.html',  // Main entry file
  output: {
    dir: 'dist',
    entryFileNames: 'js/index.js',
    chunkFileNames: 'js/chunks/[name].[hash].js',
    assetFileNames: 'js/assets/[name].[hash].[ext]',
    format: 'esm',  // ES Modules format
    sourcemap: true,  // Generate source maps for easier debugging
  },
  external: ['react', 'react-dom'],
  watch: {
    include: 'src/**',  // Watch for changes in the src directory
    exclude: 'node_modules/**',  // Exclude node_modules to avoid unnecessary rebuilds
    clearScreen: false,  // Keeps the terminal output visible while rebuilding
  },
};

export default rollupConfig;