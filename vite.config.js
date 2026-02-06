import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/project05/',
  server: {
    proxy: {
      '/api/weather': {
        target: 'https://api.openweathermap.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/weather/, '/data/2.5/weather'),
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
