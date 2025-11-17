import { default as distance } from '@turf/distance'
import vnetStopMapping from '../geospatial/vnet/vnet-mapping.json' with { type: 'json' }
import vlineRoutes from '../excel/rail/vline-route-names/routes.json' with { type: 'json' }
import metroOperators from '../excel/bus/operators/metro-operators.json' with { type: 'json' }
import { dateUtils } from '@transportme/transportvic-utils'
import milduraBusData from './mildura-bus-data.mjs'

const VLINE_ROUTES = {
  ...vlineRoutes,
  ...Object.keys(vlineRoutes).reduce((acc, railID) => ({ ...acc, [`5-${railID.slice(-3)}`]: vlineRoutes[railID] }), {})
}

/**
 * Processes GTFS route data
 * 
 * The following alterations are applied:
 * - West Gippsland Transit routes are merged into a single 6-WGT route.
 * - V/Line Pakenham (1-vPK) is dropped from the data
 * - V/Line Apollo Bay (5-GVL) is dropped from the data
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
      if (VLINE_ROUTES[route.routeGTFSID]) {
        route.routeName = VLINE_ROUTES[route.routeGTFSID]
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
      if (route.routeGTFSID.match(/4-w\d\d/) || route.routeGTFSID.match(/4-V\d\d/) || route.routeGTFSID === '4-W88') {
        route.routeGTFSID = '4-WGT'
        route.routeName = 'West Gippsland Transit'
      }

      let parts
      if (parts = route.routeGTFSID.match(/4-WN(\d)/)) {
        route.routeNumber = parts[1]
      } else if (route.routeName.match(/wallan/i) && route.routeName.match(/link a/i)) {
        route.routeNumber = 'A'
      }

      if (metroOperators[route.routeNumber]) route.operators = metroOperators[route.routeNumber]
      else console.log('Could not map operator for metro route', route.routeNumber, route.routeName)

      return route
    },
    5: function processRoute(route) {
      if (route.routeGTFSID === '5-GVL') return null
      if (route.operators[0] === 'Unknown') route.operators = ['V/Line']
      return route
    },
    6: function processRoute(route) {
      if (route.routeNumber) {
        let parts
        
        // White Night
        if (route.routeNumber.match(/^WN\d+/)) return null

        // Numbers with the town name eg Wallan 1, Barmah 8
        else if (parts = route.routeNumber.match(/^[A-Z][a-z]+ (\d+)$/)) route.routeNumber = parts[1]

        // Martin's Albury routes
        else if (parts = route.routeNumber.match(/^NSW(\d+)$/)) route.routeNumber = parts[1]
      }

      return route
    },
    10: function processRoute(route) {
      if (route.operators[0] === 'Unknown') route.operators = ['Journey Beyond']
      return route
    },
    11: function processRoute(route) {
      if (route.operators[0] === 'Unknown') route.operators = ['SkyBus']
      route.routeName = route.routeName.replace(' Stn', '') + ' SkyBus'

      return route
    }
  }
}

const WALPEUP = {
  type: 'Point',
  coordinates: [
    142.02396078037899, -35.13599577131276
  ]
}

const UNDERBOOL = {
  type: 'Point',
  coordinates: [
    141.8110141365467, -35.16992749794159
  ]
}

function checkOUY_PIN_GeneralStore(stop) {
  if (stop.fullStopName === 'General Store/Mallee Highway') {
    if (distance(WALPEUP, stop.location) < 0.5) {
      stop.fullStopName = 'Walpeup General Store/Mallee Highway'
    } else if (distance(UNDERBOOL, stop.location) < 0.5) {
      stop.fullStopName = 'Underbool General Store/Mallee Highway'
    }
  }
}

export async function createStopProcessor() {
  return {
    5: function processStop(stop) {
      if (stop.stopGTFSID === '10480' && stop.fullStopName === 'Clayton Railway Station/Haughton Road' && stop.parentStopGTFSID === '4649') {
        stop.parentStopGTFSID = null
      }
      if (stop.stopGTFSID === '4649' && stop.fullStopName === 'Clayton Railway Station/Haughton Road') return null

      checkOUY_PIN_GeneralStore(stop)

      return stop
    },
    6: function processStop(stop) {
      if (stop.stopGTFSID === '37229') {
        stop.fullStopName = 'Flora Avenue/Eleventh Street'
      } else if (stop.fullStopName === 'Flora') {
        stop.fullStopName = 'Flora Avenue/Eighth Street'
      }

      checkOUY_PIN_GeneralStore(stop)

      return stop
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
    departureTime: '05:40'
  },
  {
    origin: 'Garfield Railway Station/Nar Nar Goon-Longwarry Road',
    destination: 'Traralgon Plaza Shopping Centre/Franklin Street',
    departureTime: '06:43'
  },
  {
    origin: 'Warragul Railway Station/Alfred Street',
    destination: 'Moe Railway Station/Lloyd Street',
    departureTime: '18:45'
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
  }
]

VLINE_COACH_DUPLICATES.forEach(trip => trip.timesUsed = 0)

export async function createTripProcessor(database) {
  let stops = await database.getCollection('gtfs-stops')
  let timetables = await database.getCollection('gtfs-timetables')

  return {
    3: async function processTrip(trip) {
      const bsm = trip.stopTimings.find(stop => stop.stopGTFSID === '19497') // Bourke Street Mall
      const csq = trip.stopTimings.find(stop => stop.stopGTFSID === '19498') // City Square
      const fssIndex = trip.stopTimings.findIndex(stop => stop.stopGTFSID === '19499') // Flinders St/Fed Square

      if (bsm && (fssIndex !== -1) && !csq) {
        const time = bsm.departureTimeMinutes + 2

        let hours = Math.floor(time / 60)
        let minutes = time % 60
        let mainTime = ''

        hours %= 24
        if (hours < 10) mainTime += '0'
        mainTime += hours
        mainTime += ':'
        if (minutes < 10) mainTime += '0'
        mainTime += minutes

        const csqData = {
          "stopName" : "City Square/Swanston Street",
          "stopNumber" : "11",
          "suburb" : "Melbourne",
          "stopGTFSID" : "19498",
          "arrivalTime" : mainTime,
          "arrivalTimeMinutes" : time,
          "departureTime" : mainTime,
          "departureTimeMinutes" : time,
          "stopConditions" : {
            "pickup" : 0,
            "dropoff" : 0
          },
          "stopDistance" : bsm.stopDistance + (8212.413043615-7858.09538952478)
        }

        trip.stopTimings.splice(fssIndex, 0, csqData)
      }

      return trip
    },
    4: async function processTrip(trip) {
      // Past 4pm
      if (trip.routeGTFSID === '4-WN3' && trip.stopTimings[0].departureTimeMinutes > 960) {
        trip.routeNumber = 'B'
      }

      return trip
    },
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

      if (trip.runID && trip.runID.match(/^\d{4}[a-zA-Z]/)) {
        if (VLINE_ROUTES[trip.routeGTFSID]) {
          trip.routeName = VLINE_ROUTES[trip.routeGTFSID]
        }

        trip.isRailReplacementBus = true
        trip.railRunID = trip.runID.slice(0, 4)
      }

      return trip
    },
    6: async function processTrip(trip) {
      if (trip.routeGTFSID === '4-WGT') {
        let originStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings[0].stopGTFSID })
        let destStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings.slice(-1)[0].stopGTFSID })

        let originDist = distance(PAKENHAM, originStop.bays[0].location)
        let destDist = distance(PAKENHAM, destStop.bays[0].location)

        // Origin closer to Pakenham than destination: Down trip
        trip.gtfsDirection = originDist < destDist ? 0 : 1
      }

      if (milduraBusData.tripMapping[trip.routeGTFSID]) {
        return milduraBusData.tripMapping[trip.routeGTFSID](trip, stops)
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
