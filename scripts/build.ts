import fsp from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import { colorSchemes } from '../theme/index'

// vite build has some unused file
async function removeUnusedFile() {
  const dirs = await fsp.readdir('dist', { withFileTypes: true })
  await Promise.all(
    dirs.map(async (dir) => {
      if (dir.isFile()) {
        const name = dir.name
        const jsPath = path.join('dist', name)
        if (name.endsWith('.mjs') && name !== 'index.mjs') {
          await fsp.rm(jsPath)
        }
        if (name.endsWith('.js')) {
          const basename = path.basename(name, '.js')
          const cssPath = path.join('dist', `${basename}.css`)
          if (fs.existsSync(cssPath)) {
            const jsContent =
              `import './${basename}.css'\n` +
              (await fsp.readFile(jsPath, 'utf-8'))
            await fsp.writeFile(jsPath, jsContent)
          }
        }
      }
    }),
  )
}

async function generateTheme() {
  let cssVars = ':root{'
  for (const [key, value] of Object.entries(colorSchemes.light)) {
    cssVars += `--${key}:${value};`
  }
  cssVars += '}'
  await fsp.writeFile('dist/vars.css', cssVars)

  let darkCssVars = '.theme-dark{'
  for (const [key, value] of Object.entries(colorSchemes.dark)) {
    darkCssVars += `--${key}:${value};`
  }
  darkCssVars += '}'
  await fsp.writeFile('dist/vars-dark.css', darkCssVars)
}

async function run() {
  await removeUnusedFile()
  await generateTheme()
}

run()
