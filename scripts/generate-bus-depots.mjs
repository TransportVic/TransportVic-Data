import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'
import CsvReadableStream from 'csv-reader'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const busBaysDir = path.join(__dirname, '..', 'excel', 'bus', 'depots')
const stream = createReadStream(path.join(busBaysDir, 'Bus Depots.csv'), 'utf-8')

let acc = {}
stream.pipe(new CsvReadableStream({ asObject: true }))
  .on('data', row => {
    acc[row.depot_id] = row.depot_name
  }).on('end', async () => {
    await writeFile(path.join(busBaysDir, 'bus-depots.json'), JSON.stringify(acc, null, 1))
  })