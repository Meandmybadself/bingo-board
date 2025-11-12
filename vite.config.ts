import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    port: 4173,
    open: true
  },
  optimizeDeps: {
    include: ['lit', 'lodash']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html'
    }
  }
})

