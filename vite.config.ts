import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // * ASEGÚRATE DE QUE LA SECCIÓN `rollupOptions` NO ESTÉ AQUÍ *
      // rollupOptions: {
      //   external: ['/src/index.tsx'],
      // },
    },
  };
});
