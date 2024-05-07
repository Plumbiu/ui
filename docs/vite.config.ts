import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pages, { DefaultPageStrategy } from 'vite-plugin-react-pages'
import { pigment } from '@pigment-css/vite-plugin'
import theme from '../theme'

export default defineConfig({
  plugins: [
    react(),
    pages({
      pagesDir: path.join(__dirname, 'pages'),
      pageStrategy: new DefaultPageStrategy({
        extraFindPages: async (pagesDir, helpers) => {
          const srcPath = path.join(__dirname, '../components')
          // show all component demos during dev
          // put them in page `/components/demos/${componentName}`
          helpers.watchFiles(
            srcPath,
            '*/demos/**/*.{[tj]sx,md?(x)}',
            async function fileHandler(file, api) {
              const { relative, path: demoFilePath } = file
              const match = relative.match(/(.*)\/demos\/(.*)\.([tj]sx|mdx?)$/)
              if (!match) throw new Error('unexpected file: ' + demoFilePath)
              const [_, componentName, demoName] = match
              const pageId = `/components/demos/${componentName}`
              // register page data
              api.addPageData({
                pageId,
                key: demoName,
                // register demo runtime data path
                // it will be consumed by theme-doc
                // the ?demo query will wrap the module with useful demoInfo
                dataPath: `${demoFilePath}?demo`,
                // register demo static data
                staticData: await helpers.extractStaticData(file),
              })
            },
          )

          // find all component README
          helpers.watchFiles(
            srcPath,
            '*/README.md?(x)',
            async function fileHandler(file, api) {
              const { relative, path: markdownFilePath } = file
              const match = relative.match(/(.*)\/README\.mdx?$/)
              if (!match) {
                throw new Error('unexpected file: ' + markdownFilePath)
              }
              const [_, componentName] = match
              const pageId = `/components/${componentName}`
              // register page data
              api.addPageData({
                pageId,
                // register page component
                dataPath: markdownFilePath,
                // register static data
                staticData: await helpers.extractStaticData(file),
              })
              // register outlineInfo data
              // it will be consumed by theme-doc
              api.addPageData({
                pageId,
                key: 'outlineInfo',
                dataPath: `${markdownFilePath}?outlineInfo`,
              })
            },
          )
        },
      }),
    }),
    pigment({
      theme,
    }),
  ],
  resolve: {
    alias: {
      '@plumbiu/ui': path.join(__dirname, '../components/index.ts'),
      // eslint-disable-next-line @stylistic/max-len
    },
  },
})
