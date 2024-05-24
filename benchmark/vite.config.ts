import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: path.join(__dirname, 'src/pages'),
    }),
  ],
  resolve: {
    alias: {
      '@plumbiu/ui': path.join(__dirname, '../dist/index.mjs'),
    },
  },
})
