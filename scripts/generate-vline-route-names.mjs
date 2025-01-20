import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'
import CsvReadableStream from 'csv-reader'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const routesDir = path.join(__dirname, '..', 'excel', 'rail', 'vline-route-names')
const stream = createReadStream(path.join(routesDir, 'Routes.csv'), 'utf-8')

let acc = {}

stream.pipe(new CsvReadableStream({ asObject: true }))
  .on('data', row => {
    acc[row.route_gtfs_id] = row.route_name
  }).on('end', async () => {
    await writeFile(path.join(routesDir, 'routes.json'), JSON.stringify(acc, null, 1))
  })