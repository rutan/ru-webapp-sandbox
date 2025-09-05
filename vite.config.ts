import { cloudflare } from '@cloudflare/vite-plugin';
import tailwind from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      $worker: '/src/worker',
      $share: '/src/web/modules/_share',
    },
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: 'src/web/routes',
    }),
    react(),
    tailwind(),
    cloudflare(),
  ],
});
