import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANTE: Cambia 'PaginaRioAtuel' por el nombre de tu repositorio de GitHub
  base: '/PaginaRioAtuel/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss()
  ],
})
