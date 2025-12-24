import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import puppeteer from '@prerenderer/renderer-puppeteer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/'],
      renderer: puppeteer,
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 3000,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/g, 'https:')
        return renderedRoute
      },
    }),
  ],
  // Use subdirectory for GitHub Pages, root for Vercel/other hosts
  base: process.env.GITHUB_ACTIONS ? '/mvp-club-site-2/' : '/',
})
