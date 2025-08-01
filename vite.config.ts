import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import rollupOptions from './rollup.config';

import Restart from 'vite-plugin-restart';

import { exec } from 'child_process';

import path from 'path';

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

const packagesRoot =
  '/Users/jamellyons/Documents/J_C_LYONS_ENTERPRISES_LLC/Packages/javascript';

const uiux = path.resolve(packagesRoot, 'ui-ux');
const communications = path.resolve(packagesRoot, 'communications');
const gateway = path.resolve(packagesRoot, 'gateway');
const gitport = path.resolve(packagesRoot, 'github-portfolio');

const packages = [uiux, communications, gateway, gitport];

const isDev = process.env.NODE_ENV === 'development';

const localPackages = {
  '@the7ofdiamonds/ui-ux': uiux,
  '@the7ofdiamonds/communications': communications,
  '@the7ofdiamonds/gateway': gateway,
  '@the7ofdiamonds/github-portfolio': gitport,
};

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      ...(isDev ? localPackages : {}),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    preserveSymlinks: true,
  },
  plugins: [
    react(),
    gulp(),
    ...(isDev
      ? [
          Restart({
            restart: Object.values(packages).map((dir) => `${dir}/dist/**`),
          }),
        ]
      : []),
    ,
  ],
  define: {
    'import.meta.env': process.env,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true,
    open: true,
    fs: {
      allow: [__dirname, ...packages],
    },
    watch: {
      ignored: ['./src/services/firebase/functions'],
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
