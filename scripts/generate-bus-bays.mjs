import readXLSXFile from 'read-excel-file/node'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const busBaysDir = path.join(__dirname, '..', 'excel', 'bus', 'bays')
const stream = createReadStream(path.join(busBaysDir, 'Bus Bays.xlsx'))

const rows = await readXLSXFile(stream)
const output = rows.slice(1).reduce((acc, row) => {
  acc[row[0]] = row[1]
  return acc
}, {})

await writeFile(path.join(busBaysDir, 'bus-bays.json'), JSON.stringify(output))