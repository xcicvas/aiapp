import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    copyPublicDir: true,
  },
  publicDir: '../src/public',
  server: {
    port: 3000,
    strictPort: true,
  },
});
