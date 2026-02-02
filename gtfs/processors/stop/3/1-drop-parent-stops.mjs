export default function processStop(stop) {
  // Stops should not have a parent stop as they are all individual stops
  if (stop.parentStopGTFSID) {
    stop.parentStopGTFSID = null
    return stop
  }

  // Stations, which are the faulty parents, should be dropped
  if (stop.stopType === 'station') return null

  return stop
}