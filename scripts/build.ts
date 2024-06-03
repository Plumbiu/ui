import fsp from 'node:fs/promises'
import path from 'node:path'
import { glob } from 'fast-glob'
import { colorSchemes } from '../theme/index'

const DIST_PATH = 'dist'
const COMPONENTS_PATH = path.join(DIST_PATH, 'components')
const INDEX_JS_PATH = path.join(DIST_PATH, 'index.mjs')

const excludesCss = ['styles.css', 'vars-dark.css']

async function autoImportCss() {
  const indexJs = await fsp.readFile(INDEX_JS_PATH, 'utf-8')
  const indexJsWithInjectCss = `import './components/styles.css'\n${indexJs}`
  await fsp.writeFile(INDEX_JS_PATH, indexJsWithInjectCss)

  const cssPath = (
    await glob('**/*.css', {
      cwd: path.join(COMPONENTS_PATH),
    })
  ).filter((file) => !excludesCss.includes(file))

  await Promise.all(
    cssPath.map(async (p) => {
      const cssDir = path.dirname(p)
      const cssName = path.basename(p)
      const cssBaseName = cssName.replace(/\..*css/, '')
      const jsPath = path.join(COMPONENTS_PATH, cssDir, `${cssBaseName}.mjs`)
      const jsContent = await fsp.readFile(jsPath, 'utf-8')
      await fsp.writeFile(jsPath, `import './${cssName}'\n${jsContent}`)
    }),
  )
}

const darkCssPath = path.join(COMPONENTS_PATH, 'vars-dark.css')
const indexCssPath = path.join(COMPONENTS_PATH, 'styles.css')

async function generateTheme() {
  // -----Default Theme-----
  const indexCss = await fsp.readFile(indexCssPath, 'utf-8')
  let cssVars = ':root{'
  for (const [key, value] of Object.entries(colorSchemes.light)) {
    cssVars += `--${key}:${value};`
  }
  cssVars += `}${indexCss}`
  await fsp.writeFile(indexCssPath, cssVars)
  // -----Dark Theme-----
  let darkCssVars = await fsp.readFile(darkCssPath, 'utf-8')
  darkCssVars += '.theme-dark{'
  for (const [key, value] of Object.entries(colorSchemes.dark)) {
    darkCssVars += `--${key}:${value};`
  }
  darkCssVars += '}'
  await fsp.writeFile(darkCssPath, darkCssVars)
}

async function run() {
  await generateTheme()
  await autoImportCss()
}

run()
