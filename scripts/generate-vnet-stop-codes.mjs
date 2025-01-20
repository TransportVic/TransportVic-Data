import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'
import CsvReadableStream from 'csv-reader'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const vnetDir = path.join(__dirname, '..', 'excel', 'vnet')
const vnetBookableCodesStream = createReadStream(path.join(vnetDir, 'VNet Bookable Codes.csv'), 'utf-8')
const vnetOverridesStream = createReadStream(path.join(vnetDir, 'VNet Overrides.csv'), 'utf-8')

let acc = {}
let overrides = new Set()

vnetOverridesStream.pipe(new CsvReadableStream({ asObject: true }))
  .on('data', row => {
    overrides.add(row.stop_name)
  })
  .on('end', () => {
    vnetBookableCodesStream.pipe(new CsvReadableStream({ asObject: true }))
      .on('data', row => {
        if (!overrides.has(row.stop_name)) {
          acc[row.stop_name] = row.vnet_code
        }
      })
      .on('end', async () => {
        await writeFile(path.join(vnetDir, 'vnet-stop-codes.json'), JSON.stringify(acc, null, 2))
      })
  })
