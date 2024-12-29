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
  external: ['react', 'react-dom'],
  watch: {
    include: 'src/**/*.ts',
    exclude: 'node_modules/**',
    clearScreen: false,
  },
};

export default rollupConfig;