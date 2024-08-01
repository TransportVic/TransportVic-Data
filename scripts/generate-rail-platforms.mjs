import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'
import CsvReadableStream from 'csv-reader'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const platformsDir = path.join(__dirname, '..', 'excel', 'rail', 'platform-side')
const stream = createReadStream(path.join(platformsDir, 'Platforms.csv'), 'utf-8')

let acc = {}
stream.pipe(new CsvReadableStream())
  .on('data', row => {
    let stationName = row[0]
    if (stationName == 'Station/Platform') return

    let platforms = row.slice(1)

    let i = platforms.length - 1
    for (; i > 0 && platforms[i] === ''; i--);
    acc[stationName] = platforms.slice(0, i + 1)  
  }).on('end', async () => {
    await writeFile(path.join(platformsDir, 'platforms.json'), JSON.stringify(acc))
  })