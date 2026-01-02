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