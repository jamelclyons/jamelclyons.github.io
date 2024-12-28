import babel from '@rollup/plugin-babel';

const rollupConfig  = {
  input: {
    main: 'src/index.tsx',
  },
  output: {
    dir: 'dist/js',
    entryFileNames: 'index.js',
    chunkFileNames: 'chunks/[name].[hash].js',
    assetFileNames: 'assets/[name].[hash].[ext]',
    format: 'esm',
    sourcemap: true,
  },
  external: ['react', 'react-dom'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};

export default rollupConfig;
