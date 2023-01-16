import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        c2a: resolve(__dirname, 'c2a/index.html'),
      },
    },
  },
})
