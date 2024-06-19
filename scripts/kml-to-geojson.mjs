import * as toGeoJSON from '@tmcw/togeojson' 
import { readFile, writeFile } from 'fs/promises'
import { DOMParser } from '@xmldom/xmldom'
import path from 'path'
import url from 'url'
import { walkDir } from '../util.mjs'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function readFileAsGeoJSON(inputFile) {
  const kml = new DOMParser().parseFromString(await readFile(inputFile, 'utf8'))
  return toGeoJSON.kml(kml)
}

async function convertFile(inputFile) {
  const pathData = path.parse(inputFile)
  const baseName = pathData.name
  const outputFile = path.join(pathData.dir, baseName + '.geojson')

  const geoJSON = await readFileAsGeoJSON(inputFile)
  await writeFile(outputFile, JSON.stringify(geoJSON))
}

for (let file of await walkDir(path.join(__dirname, '..', 'geospatial'))) {
  if (file.endsWith('.kml')) await convertFile(file)
}
