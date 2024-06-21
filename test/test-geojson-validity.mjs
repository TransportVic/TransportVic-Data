import path from 'path'
import url from 'url'
import { walkDir } from '../util.mjs'
import { expect } from 'chai'
import { readFile } from "fs/promises"
import { isFeatureCollection } from "geojson-validation"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const geospatialDir = path.join(__dirname, '..', 'geospatial')
const files = await walkDir(geospatialDir)

describe('GeoJSON data', () => {
  for (let file of files) {
    // Exclude suburb boundaries file
    if (file.endsWith('.geojson') && !(file.includes('suburb-boundaries'))) {
      const relativePath = file.slice(geospatialDir.length + 1)
      
        it(relativePath, async () => {
          const fileData = JSON.parse(await readFile(file))
          const errors = isFeatureCollection(fileData, true)
          expect(errors).to.deep.equal([])
        })
    }
  }
})