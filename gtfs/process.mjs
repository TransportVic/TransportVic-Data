import { default as distance } from '@turf/distance'
import { TRANSIT_MODES } from './constants.mjs'
import vnetMapping from '../geospatial/vnet/vnet-mapping.json' with { type: 'json' }

/**
 * Processes GTFS route data
 * 
 * The following alterations are applied:
 * - West Gippsland Transit routes are merged into a single 6-WGT route.
 * - V/Line Pakenham (1-vPK) is dropped from the data
 * 
 * @param {GTFSRoute} route Route data
 * @returns {GTFSRoute} Updated route data
 */
export function processRoute(route) {
  if (route.routeGTFSID.match(/6-w\d\d/)) {
    route.routeGTFSID = '6-WGT'
    route.routeName = 'West Gippsland Transit'
  }

  if (route.routeGTFSID === '1-vPK') return null

  return route
}

const PAKENHAM = {
  type: 'Point',
  coordinates: [
    145.47895357260703, -38.07915871991305
  ]
}

export async function createTripProcessor(database) {
  let stops = await database.getCollection('stops')

  return {
    5: function processTrip(trip) {
      trip.stopTimings.forEach(stop => {
        stop.vnetName = vnetMapping[stop.stopGTFSID]
      })

      return trip
    },
    6: async function processTrip(trip) {
      if (trip.routeGTFSID === '6-WGT') {
        let originStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings[0].stopGTFSID })
        let destStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings.slice(-1)[0].stopGTFSID })

        let originDist = distance(PAKENHAM, originStop.bays[0].location)
        let destDist = distance(PAKENHAM, destStop.bays[0].location)

        // Origin closer to Pakenham than destination: Down trip
        trip.gtfsDirection = originDist < destDist ? 0 : 1
      }

      return trip
    }
  }
}