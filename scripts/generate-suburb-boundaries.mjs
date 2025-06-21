import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'
import intersect from '@turf/intersect'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const suburbFolder = path.join(__dirname, '..', 'geospatial', 'suburb-boundaries')

const suburbExtents = JSON.parse(await readFile(path.join(suburbFolder, 'interstate-suburb-extent.geojson'))).features[0]

const vic = JSON.parse(await readFile(path.join(suburbFolder, 'raw-data', 'vic.geojson')))
const sa = JSON.parse(await readFile(path.join(suburbFolder, 'raw-data', 'sa.geojson')))
const nsw = JSON.parse(await readFile(path.join(suburbFolder, 'raw-data', 'nsw.geojson')))
const act = JSON.parse(await readFile(path.join(suburbFolder, 'raw-data', 'act.geojson')))

console.log('Loaded state data')

sa.features.forEach(suburb => suburb.properties.LOC_NAME += ' (SA)')
nsw.features.forEach(suburb => suburb.properties.LOC_NAME += ' (NSW)')
act.features.forEach(suburb => suburb.properties.LOC_NAME += ' (ACT)')

function simplify(featureCollection) {
  for (let feature of featureCollection.features) {
    let coordinates = feature.geometry.coordinates[0]
    feature.geometry.coordinates[0] = coordinates.map(point => [parseFloat(point[0].toFixed(5)), parseFloat(point[1].toFixed(5))])
    feature.properties = {
      LOC_NAME: feature.properties.LOC_NAME, STATE: feature.properties.STATE,
    }
  }
}

console.log('Simplifying data...')
simplify(vic)
simplify(nsw)
simplify(sa)
simplify(act)
console.log('Done simplifying data')

const saFeatures = { type: 'FeatureCollection', features: [] }
const nswFeatures = { type: 'FeatureCollection', features: [] }

await Promise.all([
  new Promise(resolve => {
    for (let feature of sa.features) {
      let intersection = intersect({ type: 'FeatureCollection', features: [suburbExtents, feature] })
      if (intersection) saFeatures.features.push(feature)
    }
    console.log('Intersected SA data')
    resolve()
  }),
  new Promise(resolve => {
    for (let feature of nsw.features) {
      let intersection = intersect({ type: 'FeatureCollection', features: [suburbExtents, feature] })
      if (intersection) nswFeatures.features.push(feature)
    }
    console.log('Intersected NSW data')
    resolve()
  })
])

await writeFile(path.join(suburbFolder, 'vic.geojson'), JSON.stringify(vic))
await writeFile(path.join(suburbFolder, 'act.geojson'), JSON.stringify(act))
await writeFile(path.join(suburbFolder, 'sa.geojson'), JSON.stringify(saFeatures))
await writeFile(path.join(suburbFolder, 'nsw.geojson'), JSON.stringify(nswFeatures))