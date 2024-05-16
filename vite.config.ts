import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import typescript from '@rollup/plugin-typescript'
import { pigment } from '@pigment-css/vite-plugin'
import theme from './theme'

export default defineConfig({
  plugins: [
    react(),
    pigment({
      theme,
    }),
    typescript({
      declaration: true,
      emitDeclarationOnly: true,
      noForceEmit: true,
      declarationDir: resolve(__dirname, 'dist/types'),
      rootDir: resolve(__dirname, 'components'),
      exclude: ["**/demos/**"],
      allowSyntheticDefaultImports: true,
    }),
  ],
  build: {
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'components/index.ts'),
      fileName: 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
    cssTarget: 'chrome61',
  },
  resolve: {
    alias: {
      '@plumbiu/ui': path.join(__dirname, './components/index.ts'),
    },
  },
})
