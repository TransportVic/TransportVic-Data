import readXLSXFile from 'read-excel-file/node'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const stationsDir = path.join(__dirname, '..', 'excel', 'rail', 'station-codes')
const stream = createReadStream(path.join(stationsDir, 'Stations.xlsx'))

const rows = await readXLSXFile(stream)
const output = rows.slice(1).reduce((acc, row) => {
  acc[row[0]] = row[1]
  return acc
}, {})

await writeFile(path.join(stationsDir, 'station-codes.json'), JSON.stringify(output))