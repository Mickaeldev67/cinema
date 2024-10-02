import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:5173,
    https: {
      key: fs.readFileSync('../backend/security/localhost-key.pem'),
      cert: fs.readFileSync('../backend/security/localhost.pem'),
    }
  }
})
