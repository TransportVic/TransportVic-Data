export default function processTrip(trip) {
  const chi = trip.stopTimings.find(stop => stop.stopGTFSID === 'vic:rail:CHI') // Chiltern
  const sht = trip.stopTimings.find(stop => stop.stopGTFSID === 'vic:rail:SHT') // Springhurst
  if (!(chi && !sht)) return trip

  const chiIndex = trip.stopTimings.findIndex(stop => stop.stopGTFSID === 'vic:rail:CHI')

  const time = trip.direction === 'Up' ?
    chi.departureTimeMinutes + 9
    : chi.departureTimeMinutes - 8

  let hours = Math.floor(time / 60)
  let minutes = time % 60
  let mainTime = ''

  hours %= 24
  if (hours < 10) mainTime += '0'
  mainTime += hours
  mainTime += ':'
  if (minutes < 10) mainTime += '0'
  mainTime += minutes

  const shtData = {
    "stopName" : "Springhurst Railway Station",
    "stopNumber" : null,
    "suburb" : "Melbourne",
    "stopGTFSID" : "vic:rail:SHT",
    "arrivalTime" : mainTime,
    "arrivalTimeMinutes" : time,
    "departureTime" : mainTime,
    "departureTimeMinutes" : time,
    "stopConditions" : {
      "pickup" : 0,
      "dropoff" : 0
    },
    "stopDistance" : chi.stopDistance + 13760 * (trip.direction === 'Up' ? 1 : -1)
  }

  trip.stopTimings.splice(chiIndex + (trip.direction === 'Up' ? 1 : 0), 0, shtData)

  return trip
}