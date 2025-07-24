import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Asegúrate de que este path sea correcto para App.tsx

console.log("Valor de VITE_GEMINI_API_KEY en index.tsx:", import.meta.env.VITE_GEMINI_API_KEY);

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('No se pudo encontrar el elemento root para montar la aplicación.');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
