import { defineConfig, loadEnv } from 'vite'; // Asegúrate de importar loadEnv
import react from '@vitejs/plugin-react'; // O el plugin de tu framework (Vue, Svelte, etc.)
import path from 'path'; // Si ya lo usas, bien. Si no, añádelo.

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Carga todas las variables de entorno con prefijo VITE_ o no prefijo

  return {
    plugins: [react()], // Asegúrate de que tus plugins están aquí
    define: {
      // Asegura que VITE_GEMINI_API_KEY se inyecte correctamente
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
      // O si prefieres un enfoque más general para todas las VITE_ variables:
      // 'process.env': JSON.stringify(env), // Esto expone todo el objeto env.
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Si estás usando aliases
      },
    },
    // ... otras configuraciones de Vite ...
  };
});
