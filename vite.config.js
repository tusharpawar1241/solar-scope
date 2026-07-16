import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    // Expose the dev server to the local network so other devices can connect
    host: true,

    // Proxy: any request starting with /api is forwarded to the Express backend.
    // This means the frontend never needs to know the backend's address —
    // the browser talks to Vite (same origin), Vite talks to Express.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
