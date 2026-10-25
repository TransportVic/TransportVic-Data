const VLINE_COACH_DUPLICATES = [
  // West Gippsland Transit trips
  {
    origin: 'Drouin Railway Station',
    destination: 'Traralgon Railway Station',
    departureTime: '05:40'
  },
  {
    origin: 'Garfield Railway Station',
    destination: 'Traralgon Plaza Shopping Centre/Franklin Street',
    departureTime: '06:43'
  },
  {
    origin: 'Warragul Railway Station',
    destination: 'Moe Railway Station',
    departureTime: '18:55'
  },
  {
    origin: 'Garfield Railway Station',
    destination: 'Nar Nar Goon Railway Station',
    departureTime: '18:34'
  },

  // Duplicate trips from Cowes - Anderson - Wonthaggi
  {
    origin: 'Cowes Transit Centre/Church Street',
    destination: 'Anderson Bus Interchange/Bass Highway'
  }
].map(trip => ({ ...trip, timesUsed: 0 }))

export default function processTrip(trip) {
  const tripRule = VLINE_COACH_DUPLICATES.find(rule => {
    const stopsMatch = trip.origin === rule.origin && trip.destination === rule.destination
    if (rule.departureTime) return trip.departureTime === rule.departureTime && stopsMatch
    return stopsMatch
  })

  if (tripRule) {
    tripRule.timesUsed++
    return null
  } else {
    return trip
  }
}

export function getVLineRuleStats() {
  return VLINE_COACH_DUPLICATES
}