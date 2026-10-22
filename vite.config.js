import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://enkajepro.com',
      generateRobotsTxt: false,
      dynamicRoutes: ['/portal', '/talleres', '/trabajos', '/blog', '/blog/carpintero-en-monterrey', '/blog/cuanto-anticipo-dar-carpintero', '/blog/mdf-vs-melamina-vs-madera'],
    })
  ],
})
