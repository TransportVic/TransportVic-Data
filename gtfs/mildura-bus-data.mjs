import { default as distance } from '@turf/distance'

const MERBEIN = {
  type: 'Point',
  coordinates: [
    142.05841613328718, -34.16800013407771
  ]
}

const RED_CLIFFS = {
  type: 'Point',
  coordinates: [
    142.18646891769262, -34.30842863869814
  ]
}

export default {
  "stops": [
  ],
  "routes": [{
    "route_id": "6-M21",
    "agency_id": "",
    "route_short_name": "211",
    "route_long_name": "Merbein - Mildura"
  }, {
    "route_id": "6-M31",
    "agency_id": "",
    "route_short_name": "311",
    "route_long_name": "Merbein - Mildura"
  }, {
    "route_id": "6-M32",
    "agency_id": "",
    "route_short_name": "312",
    "route_long_name": "Merbein - Mildura"
  }, {
    "route_id": "6-M25",
    "agency_id": "",
    "route_short_name": "250",
    "route_long_name": "Merbein - Mildura"
  }, {
    "route_id": "6-M30",
    "agency_id": "",
    "route_short_name": "300",
    "route_long_name": "Merbein - Mildura"
  }, {
    "route_id": "6-M10",
    "agency_id": "",
    "route_short_name": "100",
    "route_long_name": "Red Cliffs - Mildura"
  }, {
    "route_id": "6-M20",
    "agency_id": "",
    "route_short_name": "200",
    "route_long_name": "Red Cliffs - Mildura"
  }],
  "tripMapping": {
    // 211: Merbein - Mildura via Mildura Central SC and Tenth Street
    // 311: Mildura - Merbein via Mildura Central SC and Tenth Street
    // 312: Mildura - Merbein via Eleventh Street
    "6-40b": async function handle211_311_312(trip, stops) {
      const originStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings[0].stopGTFSID })
      const destStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings.slice(-1)[0].stopGTFSID })

      const originDist = distance(MERBEIN, originStop.bays[0].location)
      const destDist = distance(MERBEIN, destStop.bays[0].location)

      const towardsMildura = originDist < destDist

      if (towardsMildura) { // 211
        trip.routeNumber = '211'
        trip.routeGTFSID = '6-M21'
        return trip
      }
      // Need to differentiate 311 and 312
      const hasMilduraCentral = trip.stopTimings.some(stop => stop.stopName.includes('Mildura Central Shopping Centre'))
      if (hasMilduraCentral) { // 311
        trip.routeNumber = '311'
        trip.routeGTFSID = '6-M31'
      } else { // 312
        trip.routeNumber = '312'
        trip.routeGTFSID = '6-M32'
      }

      trip.gtfsDirection = 0

      return trip
    },
    // 250: Merbein - Mildura
    // 300: Mildura - Merbein
    "6-920": async function handle_250_300(trip, stops) {
      const originStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings[0].stopGTFSID })
      const destStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings.slice(-1)[0].stopGTFSID })

      const originDist = distance(MERBEIN, originStop.bays[0].location)
      const destDist = distance(MERBEIN, destStop.bays[0].location)

      const towardsMildura = originDist < destDist

      if (towardsMildura) {
        trip.routeNumber = '250'
        trip.routeGTFSID = '6-M25'
      } else {
        trip.routeNumber = '300'
        trip.routeGTFSID = '6-M30'
      }

      trip.gtfsDirection = 0

      return trip
    },
    // 100: Mildura - Red Cliffs
    // 200: Red Cliffs - Mildura
    "6-921": async function handle_100_200(trip, stops) {
      const originStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings[0].stopGTFSID })
      const destStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings.slice(-1)[0].stopGTFSID })

      const originDist = distance(RED_CLIFFS, originStop.bays[0].location)
      const destDist = distance(RED_CLIFFS, destStop.bays[0].location)

      const towardsMildura = originDist < destDist

      if (towardsMildura) {
        trip.routeNumber = '200'
        trip.routeGTFSID = '6-M20'
      } else {
        trip.routeNumber = '100'
        trip.routeGTFSID = '6-M10'
      }

      trip.gtfsDirection = 0

      return trip
    }
  }
}