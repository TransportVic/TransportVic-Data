export default function processTrip(trip) {
  // Past 4pm
  if (trip.routeGTFSID === '4-WN3' && trip.stopTimings[0].departureTimeMinutes > 960) {
    trip.routeNumber = 'B'
  }

  return trip
}