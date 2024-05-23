import path from 'node:path'
import fs from 'node:fs'
import { defineConfig, InlineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import typescript from '@rollup/plugin-typescript'
import { pigment } from '@pigment-css/vite-plugin'
import theme from './theme'

const dirs = fs.readdirSync('components')
const inputoptions = dirs.filter((dir) => !dir.includes('.') && dir[0] !== '_')

const entry = {
  index: 'components/index.ts',
  ...Object.fromEntries(
    inputoptions.map((dir) => [dir, path.join('components', dir, 'index.tsx')]),
  ),
}

export const viteOptions: InlineConfig = {
  plugins: [
    react(),
    pigment({
      theme,
    }),
    typescript({
      declaration: true,
      emitDeclarationOnly: true,
      noForceEmit: true,
      include: ['**/index.ts'],
      allowSyntheticDefaultImports: true,
    }),
  ],
  build: {
    lib: {
      formats: ['es'],
      entry,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: '[name].css',
        chunkFileNames: '[name].mjs',
        entryFileNames: '[name].mjs',
        manualChunks: {
          _bundle: ['ahooks', '@pigment-css/react'],
          _base: ['@/_styles', '@/_common', '@/_hooks', '@/icon'],
        },
        globals: {
          react: 'React',
        },
      },
    },
    cssTarget: 'chrome61',
    minify: true,
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@plumbiu/ui': path.join(__dirname, 'components/index.ts'),
      '@': path.join(__dirname, 'components/'),
    },
  },
}

export default defineConfig(viteOptions)
