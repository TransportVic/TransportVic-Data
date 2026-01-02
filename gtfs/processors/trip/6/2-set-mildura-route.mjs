import milduraBusData from '../../../mildura-bus-data.mjs'

export default async function processTrip(trip, stops) {
  const tripRewrite = milduraBusData.tripMapping[trip.routeGTFSID]
  return tripRewrite ? await tripRewrite(trip, stops) : trip
}