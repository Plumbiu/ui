import fsp from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import { colorSchemes } from '../theme/index'

async function autoImportCss() {
  const dirs = await fsp.readdir('dist', { withFileTypes: true })
  await Promise.all(
    dirs.map(async (dir) => {
      if (dir.isFile()) {
        if (dir.name.endsWith('.css')) {
          const basename = path.basename(dir.name, '.css')
          const jsFilePath = path.join('dist', `${basename}.mjs`)
          if (fs.existsSync(jsFilePath)) {
            const jsContent = await fsp.readFile(jsFilePath, 'utf-8')
            await fsp.writeFile(
              jsFilePath,
              `import './${dir.name}'\n` + jsContent,
            )
          }
        }
      }
    }),
  )
}

async function generateTheme() {
  const indexCss = await fsp.readFile('dist/index.css')
  let cssVars = ':root{'
  for (const [key, value] of Object.entries(colorSchemes.light)) {
    cssVars += `--${key}:${value};`
  }
  cssVars += `}${indexCss}`
  await fsp.writeFile('dist/index.css', cssVars)

  let darkCssVars = '.theme-dark{'
  for (const [key, value] of Object.entries(colorSchemes.dark)) {
    darkCssVars += `--${key}:${value};`
  }
  darkCssVars += '}'
  await fsp.writeFile('dist/vars-dark.css', darkCssVars)
}

async function run() {
  await generateTheme()
  await autoImportCss()
}

run()
