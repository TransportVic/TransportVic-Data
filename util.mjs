import fs from 'fs/promises'
import path from 'path'

export async function walkDir(dir) {
  let results = []
  let list = await fs.readdir(dir)

  for (let item of list) {
    let file = path.resolve(dir, item)
    let stat = await fs.stat(file)

    if (stat && stat.isDirectory()) {
      results.push(...await walkDir(file))
    } else {
      results.push(file)
    }
  }

  return results
}