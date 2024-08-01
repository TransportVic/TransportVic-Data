import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'
import CsvReadableStream from 'csv-reader'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const stationsDir = path.join(__dirname, '..', 'excel', 'rail', 'station-codes')
const stream = createReadStream(path.join(stationsDir, 'Stations.csv'), 'utf-8')

let acc = {}

stream.pipe(new CsvReadableStream({ asObject: true }))
  .on('data', row => {
    acc[row.station_name] = row.code
  }).on('end', async () => {
    await writeFile(path.join(stationsDir, 'station-codes.json'), JSON.stringify(acc))
  })