import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Asegúrate de que path esté importado si lo usas para alias

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Carga todas las variables de entorno

  return {
    plugins: [react()], // Tus plugins aquí
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Si usas alias para rutas absolutas
      },
    },
    // ... otras configuraciones de Vite ...
  };
});
