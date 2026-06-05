import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
  sitemap({ 
  hostname: 'https://enkajepro.com',
  generateRobotsTxt: false
})
      routes: ['/', '/app', '/legal/privacidad', '/legal/terminos', '/legal/cookies'],
    })
  ],
})
