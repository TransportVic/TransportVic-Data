import { default as distance } from '@turf/distance'
import vnetStopMapping from '../geospatial/vnet/vnet-mapping.json' with { type: 'json' }
import vnetTripMapping from '../geospatial/vnet/coach-service-ids.json' with { type: 'json' }
import vlineRoutes from '../excel/rail/vline-route-names/routes.json' with { type: 'json' }
import metroOperators from '../excel/bus/operators/metro-operators.json' with { type: 'json' }
import { dateUtils } from '@transportme/transportvic-utils'

const DAY_CACHE = {}

/**
 * Processes GTFS route data
 * 
 * The following alterations are applied:
 * - West Gippsland Transit routes are merged into a single 6-WGT route.
 * - V/Line Pakenham (1-vPK) is dropped from the data
 * - White Night routes are dropped
 * - Metro Bus operators are applied
 * - Regional bus numbers are modified to remove any town names
 * 
 * @param {GTFSRoute} route Route data
 * @returns {GTFSRoute} Updated route data
 */
export function createRouteProcessor() {
  return {
    1: function processRoute(route) {
      if (route.routeGTFSID === '1-vPK') return null
      if (vlineRoutes[route.routeGTFSID]) {
        route.routeName = vlineRoutes[route.routeGTFSID]
      }

      if (route.operators[0] === 'Unknown') route.operators = ['V/Line']

      return route
    },
    2: function processRoute(route) {
      if (route.operators[0] === 'Unknown') route.operators = ['Metro']
      return route
    },
    3: function processRoute(route) {
      if (route.operators[0] === 'Unknown') route.operators = ['Yarra Trams']
      return route
    },
    4: function processRoute(route) {
      if (metroOperators[route.routeNumber]) route.operators = metroOperators[route.routeNumber]
      else console.log('Could not map operator for metro route', route.routeNumber, route.routeName)

      return route
    },
    5: function processRoute(route) {
      if (route.operators[0] === 'Unknown') route.operators = ['V/Line']
      return route
    },
    6: function processRoute(route) {
      if (route.routeGTFSID.match(/6-w\d\d/)) {
        route.routeGTFSID = '6-WGT'
        route.routeName = 'West Gippsland Transit'
      }

      if (route.routeNumber) {
        let parts
        
        // White Night
        if (route.routeNumber.match(/^WN\d+/)) return null

        // Numbers with the town name eg Wallan 1, Barmah 8
        else if (parts = route.routeNumber.match(/^[A-Z][a-z]+ (\d+)$/)) route.routeNumber = parts[1]

        // Martin's Albury routes
        else if (parts = route.routeNumber.match(/^NSW(\d+)$/)) route.routeNumber = parts[1]

        // Wallan Link A
        else if (parts = route.routeNumber.match(/Link (\w)$/)) route.routeNumber = parts[1]
      }

      return route
    },
    10: function processRoute(route) {
      if (route.operators[0] === 'Unknown') route.operators = ['Journey Beyond']
      return route
    },
    11: function processRoute(route) {
      if (route.operators[0] === 'Unknown') route.operators = ['Skybus']
      return route
    }
  }
}

const PAKENHAM = {
  type: 'Point',
  coordinates: [
    145.47895357260703, -38.07915871991305
  ]
}

const VLINE_COACH_DUPLICATES = [
  // West Gippsland Transit trips
  {
    origin: 'Drouin Railway Station/Princes Way',
    destination: 'Traralgon Railway Station/Princes Street',
    departureTime: '05:45'
  },
  {
    origin: 'Garfield Railway Station/Nar Nar Goon-Longwarry Road',
    destination: 'Traralgon Plaza Shopping Centre/Franklin Street',
    departureTime: '06:45'
  },
  {
    origin: 'Pakenham Railway Station/Railway Avenue',
    destination: 'Garfield Railway Station/Nar Nar Goon-Longwarry Road',
    departureTime: '17:25'
  },
  {
    origin: 'Warragul Railway Station/Alfred Street',
    destination: 'Moe Railway Station/Lloyd Street',
    departureTime: '18:45'
  },
  {
    origin: 'Warragul Railway Station/Queen Street',
    destination: 'Pakenham Railway Station/Railway Avenue',
    departureTime: '16:35'
  },
  {
    origin: 'Garfield Railway Station/Nar Nar Goon-Longwarry Road',
    destination: 'Nar Nar Goon Railway Station/Carney Street',
    departureTime: '18:25'
  },

  // Duplicate trips from Cowes - Anderson - Wonthaggi
  {
    origin: 'Cowes Transit Centre/Church Street',
    destination: 'Anderson Bus Interchange/Bass Highway'
  },
]

VLINE_COACH_DUPLICATES.forEach(trip => trip.timesUsed = 0)

vnetTripMapping.forEach(trip => trip.timesUsed = 0)

export async function createTripProcessor(database, extraFunctions = {}) {
  let stops = await database.getCollection('gtfs-stops')
  let timetables = await database.getCollection('gtfs-timetables')

  return {
    5: async function processTrip(trip) {
      let tripRule = VLINE_COACH_DUPLICATES.find(rule => {
        let stopsMatch = trip.origin === rule.origin && trip.destination === rule.destination
        if (rule.departureTime) return trip.departureTime === rule.departureTime && stopsMatch
        return stopsMatch
      })

      if (tripRule) {
        tripRule.timesUsed++
        return null
      }

      trip.stopTimings.forEach(stop => {
        stop.vnetName = vnetStopMapping[stop.stopGTFSID]
      })

      if (!DAY_CACHE[trip.operationDays[0]]) {
        DAY_CACHE[trip.operationDays[0]] = dateUtils.getDayOfWeek(dateUtils.parseDate(trip.operationDays[0]))
      }
      let dayOfWeek = DAY_CACHE[trip.operationDays[0]]

      let matchingTrip = vnetTripMapping.find(rule => {
        let stopsMatch = trip.origin === rule.origin && trip.destination === rule.destination
        let timesMatch = trip.departureTime === rule.departureTime

        return stopsMatch && timesMatch && rule.operationDays.includes(dayOfWeek)
      })

      if (matchingTrip) {
        trip.runID = matchingTrip.runID
        matchingTrip.timesUsed++
      }

      if (extraFunctions.checkRRB && !trip.runID) {
        let nspTrip = await extraFunctions.checkRRB(trip, trip.operationDays[0], timetables)
        if (nspTrip) {
          trip.isRailReplacementBus = true
          trip.routeName = nspTrip.routeName
          trip.railRunID = nspTrip.runID
        }
      }

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
    },
    10: function processTrip(trip) {
      const dayOfWeekRaw = dateUtils.parseDate(trip.operationDays[0]).weekday
      const dayOfWeek = dayOfWeekRaw === 7 ? 1 : dayOfWeekRaw + 1
      const sssBound = trip.destination === 'Southern Cross Railway Station'

      trip.runID = `${dayOfWeek}${sssBound ? 'AM' : 'MA'}8`

      return trip
    }
  }
}

export function getVLineRuleStats() {
  return VLINE_COACH_DUPLICATES
}

export function getVLineCoachStats() {
  return vnetTripMapping
}
