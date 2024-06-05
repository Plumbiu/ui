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
    ignore: ['**/types/**']
  }
  const componentsJs = await glob('**/*.mjs', globOtpions)
  const componentsCss = await glob('**/*.css', globOtpions)

  let jsStr = ''
  await Promise.all(
    componentsJs.map(async (componentPath) => {
      const content = await fsp.readFile(componentPath, 'utf-8')
      jsStr += content
    }),
  )
  let cssStr = ''
  await Promise.all(
    componentsCss.map(async (componentPath) => {
      const content = await fsp.readFile(componentPath, 'utf-8')
      cssStr += content
    }),
  )

  const jsSize = await gzipSize(jsStr)
  const cssSize = await gzipSize(cssStr)

  console.log('js gziped size: ', jsSize / 1024, 'kb')
  console.log('css gziped size: ', cssSize / 1024, 'kb')
  console.log('total gziped size: ', (cssSize + jsSize) / 1024, 'kb')
}

run()
