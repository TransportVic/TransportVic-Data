import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'
import CsvReadableStream from 'csv-reader'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const stopsDir = path.join(__dirname, '..', 'excel', 'stops')
const stream = createReadStream(path.join(stopsDir, 'Unique Stops.csv'), 'utf-8')

let acc = []

stream.pipe(new CsvReadableStream({ asObject: true }))
  .on('data', row => {
    acc.push(row.stop_name)
  }).on('end', async () => {
    await writeFile(path.join(stopsDir, 'unique-stops.json'), JSON.stringify(acc))
  })