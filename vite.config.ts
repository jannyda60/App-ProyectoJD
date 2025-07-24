import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // ¡¡Añade este nuevo bloque 'build' aquí!!
    build: {
      rollupOptions: {
        external: ['/src/index.tsx'], // Indica a Rollup que trate este archivo como externo
      },
    },
    // Puedes mantener otras configuraciones si las tenías después de este bloque, como server, etc.
  };
});
