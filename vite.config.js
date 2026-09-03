import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// Two pages: the marketing landing at the root and the editor at /app/.
// Keeping them in one project means one build and one deploy, and it leaves
// the root path free for published tour URLs later.
export default defineConfig({
  // Relative asset paths, so a build works from a domain root or a subpath.
  base: './',
  build: {
    rollupOptions: {
      input: {
        landing: fileURLToPath(new URL('./index.html', import.meta.url)),
        app: fileURLToPath(new URL('./app/index.html', import.meta.url)),
      },
    },
  },
})
