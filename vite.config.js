import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- This is what's missing!

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- This "powers" the index.css
  ],
})