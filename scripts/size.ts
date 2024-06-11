import fsp from 'node:fs/promises'
import path from 'node:path'
import { gzipSize } from 'gzip-size'
import { glob } from 'fast-glob'

const DIST_PATH = path.join('dist')

async function run() {
  const globOtpions = {
    cwd: DIST_PATH,
    dot: true,
    absolute: true,
    ignore: ['**/types/**'],
  }
  const componentsJs = await glob('**/*.mjs', globOtpions)
  const componentsCss = await glob('**/*.css', globOtpions)

  let jsTotal = 0
  await Promise.all(
    componentsJs.map(async (componentPath) => {
      const content = (await fsp.readFile(componentPath, 'utf-8')).replace(
        /import \"@pigment-css\/react";\n?/,
        '',
      )
      await fsp.writeFile(componentPath, content)
      const len = await gzipSize(content)
      jsTotal += len
    }),
  )
  let cssTotal = 0
  await Promise.all(
    componentsCss.map(async (componentPath) => {
      const content = await fsp.readFile(componentPath, 'utf-8')
      const len = await gzipSize(content)
      cssTotal += len
    }),
  )


  console.log('js gziped size: ', jsTotal / 1024, 'kb')
  console.log('css gziped size: ', cssTotal / 1024, 'kb')
  console.log('total gziped size: ', (cssTotal + jsTotal) / 1024, 'kb')
}

run()
