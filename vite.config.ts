import path from 'node:path'
import { defineConfig, InlineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import typescript from '@rollup/plugin-typescript'
import { pigment } from '@pigment-css/vite-plugin'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import theme from './theme'

const entry = {
  index: 'components/index.ts',
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
    nodeResolve(),
    commonjs(),
  ],
  build: {
    lib: {
      formats: ['es'],
      entry,
    },
    reportCompressedSize: false,
    rollupOptions: {
      external: [
        /^react\/?.*/,
        /^react-dom\/?.*/,
        'clsx',
        'ahooks',
        '@pigment-css/react',
      ],
      output: {
        preserveModules: true,
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].mjs',
        entryFileNames: (chunkInfo) => {
          return '[name].mjs'
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
