import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'
import CsvReadableStream from 'csv-reader'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const busBaysDir = path.join(__dirname, '..', 'excel', 'bus', 'bays')
const stream = createReadStream(path.join(busBaysDir, 'Bus Bays.csv'), 'utf-8')

let acc = {}
stream.pipe(new CsvReadableStream({ asObject: true }))
  .on('data', row => {
    acc[row.stop_id] = row.bay
  }).on('end', async () => {
    await writeFile(path.join(busBaysDir, 'bus-bays.json'), JSON.stringify(acc, null, 1))
  })