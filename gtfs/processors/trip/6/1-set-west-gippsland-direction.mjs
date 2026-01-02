const PAKENHAM = {
  type: 'Point',
  coordinates: [
    145.47895357260703, -38.07915871991305
  ]
}

export default async function processTrip(trip, stops) {
  if (trip.routeGTFSID !== '4-WGT') return trip
  let originStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings[0].stopGTFSID })
  let destStop = await stops.findDocument({ 'bays.stopGTFSID': trip.stopTimings.slice(-1)[0].stopGTFSID })

  let originDist = distance(PAKENHAM, originStop.bays[0].location)
  let destDist = distance(PAKENHAM, destStop.bays[0].location)

  // Origin closer to Pakenham than destination: Down trip
  trip.gtfsDirection = originDist < destDist ? 0 : 1

  return trip
}