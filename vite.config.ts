import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Necesitas esta importación si usas path para alias

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno desde el directorio de trabajo actual.
  // El tercer parámetro '' carga todas las variables sin un prefijo específico,
  // pero Vite por defecto solo expone las que empiezan con VITE_.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Importante: Usa 'import.meta.env.VITE_GEMINI_API_KEY' directamente aquí.
      // JSON.stringify() es necesario para que el valor sea una cadena en el código JS final.
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Si usas alias para rutas absolutas
      },
    },
    // Otras configuraciones de Vite (si tienes alguna adicional)
    // server: {
    //   port: 3000,
    // },
    // build: {
    //   outDir: 'dist',
    // },
  };
});
