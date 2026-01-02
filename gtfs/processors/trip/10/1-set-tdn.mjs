import { dateUtils } from '@transportme/transportvic-utils'

export default function processTrip(trip) {
  const dayOfWeekRaw = dateUtils.parseDate(trip.operationDays[0]).weekday
  const dayOfWeek = dayOfWeekRaw === 7 ? 1 : dayOfWeekRaw + 1
  const sssBound = trip.destination === 'Southern Cross Railway Station'

  trip.vnetRunID = trip.runID
  trip.runID = `${dayOfWeek}${sssBound ? 'AM' : 'MA'}8`

  return trip
}