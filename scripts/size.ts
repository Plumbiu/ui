import fsp from 'node:fs/promises'
import path from 'node:path'
import { gzipSize } from 'gzip-size'

async function run() {
  const dirs = await fsp.readdir('dist')
  let total = 0
  await Promise.all(
    dirs.map(async (dir) => {
      if (dir === 'types' || dir === 'inedx.mjs') {
        return
      }
      const filePath = path.join('dist', dir)
      const content = await fsp.readFile(filePath)
      const len = await gzipSize(content)
      total += len
    }),
  )
  console.log('gziped size: ', total / 1024, 'kb')
}

run()
