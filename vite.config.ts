import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const isSsrBuild = process.argv.includes('--ssr');

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      outDir: isSsrBuild ? 'dist/server' : 'dist',
      emptyOutDir: !isSsrBuild,
      ssr: isSsrBuild ? 'src/entry-server.tsx' : undefined,
      rollupOptions: {
        input: isSsrBuild ? undefined : path.resolve(__dirname, 'index.html'),
      },
    },
  };
});
