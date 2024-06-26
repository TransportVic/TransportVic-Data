import readXLSXFile from 'read-excel-file/node'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const platformsDir = path.join(__dirname, '..', 'excel', 'rail', 'platform-side')
const stream = createReadStream(path.join(platformsDir, 'Platforms.xlsx'))

const rows = await readXLSXFile(stream)
const output = rows.slice(1).reduce((acc, row) => {
  let platforms = row.slice(1)

  let i = platforms.length - 1
  for (; i > 0 && platforms[i] === null; i--);
  acc[row[0]] = platforms.slice(0, i + 1)

  return acc
}, {})

await writeFile(path.join(platformsDir, 'platforms.json'), JSON.stringify(output))