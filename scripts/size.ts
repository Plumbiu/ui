import fsp from 'node:fs/promises'
import path from 'node:path'
import { gzipSize } from 'gzip-size'
import { glob } from 'fast-glob'

const COMPONENT_PATH = path.join('dist', 'components')
const BUNDLE_PATH = path.join('dist', '_bundle')

async function run() {
  const components = await glob('**/*', {
    cwd: COMPONENT_PATH,
    dot: true,
    absolute: true,
  })
  const bundles = await glob('**/*', {
    cwd: BUNDLE_PATH,
    dot: true,
    absolute: true,
  })

  let total = 0
  await Promise.all(
    components.map(async (componentPath) => {
      const content = await fsp.readFile(componentPath, 'utf-8')
      const gzipedSize = await gzipSize(content)
      total += gzipedSize
    }),
  )

  await Promise.all(
    bundles.map(async (bundlePath) => {
      const content = await fsp.readFile(bundlePath, 'utf-8')
      const gzipedSize = await gzipSize(content)
      total += gzipedSize
    }),
  )
  console.log('gziped size: ', total / 1024, 'kb')
}

run()
