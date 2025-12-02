import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use base '/Ionian-Mode/' so assets resolve correctly on GitHub Pages at
// https://<username>.github.io/Ionian-Mode/
export default defineConfig({
  base: '/Ionian-Mode/',
  plugins: [react()],
  build: {
    outDir: 'docs'
  }
})