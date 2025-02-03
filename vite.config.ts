import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import rollupOptions from './rollup.config';

import { exec } from 'child_process';

import path from 'path';

import typescript from '@rollup/plugin-typescript';

const gulp = (): PluginOption => {
  return {
    name: 'run-gulp-tasks',
    apply: 'serve',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        return new Promise<void>((resolve) => {
          console.log('Starting Gulp watch...');
          const gulpProcess = exec('gulp watch');

          gulpProcess.stdout?.on('data', (data) => {
            console.log(`[Gulp]: ${data}`);
          });

          gulpProcess.stderr?.on('data', (data) => {
            console.error(`[Gulp Error]: ${data}`);
          });

          gulpProcess.on('close', (code) => {
            if (code !== 0) {
              console.error(`Gulp watch process exited with code ${code}`);
            } else {
              console.log('Gulp watch process completed successfully.');
            }
            resolve();
          });
        });
      });
    },
  };
};

/** @type {import('vite').UserConfig} */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [react(), typescript({ tsconfig: './tsconfig.json' }), gulp()],
  define: {
    'import.meta.env': process.env,
  },
  base: '/',
  server: {
    port: 3000,
    cors: true,
    open: true,
    watch: {
      ignored: ['**/node_modules/**'],
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    emptyOutDir: false,
    rollupOptions: rollupOptions,
  },
});
