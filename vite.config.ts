import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    resolve: {
      tsconfigPaths: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'src/setup-tests.ts',
    },
  };
});