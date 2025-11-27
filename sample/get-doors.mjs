import doors from '../excel/rail/platform-side/platforms.json' with { type: 'json' }

let easternLines = [
  "Alamein", "Belgrave", "Glen Waverley", "Lilydale",
  "Frankston", "Cranbourne", "Pakenham", "Sandringham",
  "Mernda", "Hurstbridge", "City Circle"
]

let mtpEasternLines = [
  "Cranbourne", "Pakenham", "Frankston"
]

function accountForDirection(tripDirection, doorSide) {
  if (tripDirection === 'Down') return doorSide
  return doorSide === 'L' ? 'R' : 'L'
}

function getFSSDirectionUp(trip) {
  const viaLoop = trip.stopTimings.some(stop => stop.stopName === 'Parliament Railway Station' && !stop.cancelled)

  if (easternLines.includes(trip.routeName)) {
    return viaLoop ? 'Up' : 'Down'
  }

  // Western
  return viaLoop ? 'Down' : 'Up'
}

function getFSSDirection(trip) {
  let upDirection = getFSSDirectionUp(trip)
  if (trip.direction === 'Up') return upDirection

  return upDirection === 'Up' ? 'Down' : 'Up'
}

function getTHLDirection(trip) {
  let upDirection = mtpEasternLines.includes(trip.routeName) ? 'Down' : 'Up'
  if (trip.direction === 'Up') return upDirection

  return upDirection === 'Up' ? 'Down' : 'Up'
}

export default function appendDoorsData(trip) {
  trip.stopTimings.forEach(stop => {
    let platformInt = parseInt(stop.platform) - 1
    const stopName = stop.stopName.slice(0, -16)

    if (!doors[stopName]) console.log(stopName)
    let rawDoorSide = doors[stopName][platformInt]

    let direction = trip.direction
    if (stopName === 'Flinders Street') direction = getFSSDirection(trip)
    if (stopName === 'Town Hall') direction = getTHLDirection(trip)

    stop.doorSide = accountForDirection(direction, rawDoorSide)
  })
}

