import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['ncr-frontend-701153034898.europe-west1.run.app'],
    host: true
  }
})
