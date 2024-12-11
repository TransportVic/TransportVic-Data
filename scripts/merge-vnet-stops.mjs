import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'
import { default as nearestPoint } from '@turf/nearest-point'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const vnetStopsDir = path.join(__dirname, '..', 'geospatial', 'vnet')
const vnetStops = JSON.parse(await readFile(path.join(vnetStopsDir, 'vnet-stops.geojson')))
const gtfsStops = JSON.parse(await readFile(path.join(vnetStopsDir, 'vline-gtfs-stops.geojson')))

let mapping = gtfsStops.features.reduce((acc, gtfsStop) => {
  let closestVNetStop = nearestPoint(gtfsStop, {
    "type": "FeatureCollection",
    "features": vnetStops.features.filter(feature => feature.geometry)
  })

  acc[gtfsStop.properties.stopGTFSID] = closestVNetStop.properties.name

  return acc
}, {})

await writeFile(path.join(vnetStopsDir, 'vnet-mapping.json'), JSON.stringify(mapping, null, 2))