export default function processTrip(trip) {
  const stawell = trip.stopTimings.find(stop => stop.stopGTFSID === 'vic:rail:STL')
  if (stawell) {
    stawell.stopName = 'Stawell Railway Station'
    stawell.stopGTFSID = 'vic:rail:STL-V'
    stawell.suburb = 'Stawell'
  }

  return trip
}