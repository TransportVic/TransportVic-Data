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
  if (easternLines.includes(trip.routeData.routeName)) {
    return trip.runData.viaCityLoop ? 'Up' : 'Down'
  }

  // Western
  return trip.runData.viaCityLoop ? 'Down' : 'Up'
}

function getFSSDirection(trip) {
  let upDirection = getFSSDirectionUp(trip)
  if (trip.runData.direction.railDirection === 'Up') return upDirection

  return upDirection === 'Up' ? 'Down' : 'Up'
}

function getTHLDirection(trip) {
  let upDirection = mtpEasternLines.includes(trip.routeData.routeName) ? 'Down' : 'Up'
  if (trip.runData.direction.railDirection === 'Up') return upDirection

  return upDirection === 'Up' ? 'Down' : 'Up'
}

export default function appendDoorsData(trip) {
  trip.stops.forEach(stop => {
    let platformInt = parseInt(stop.platform) - 1
    if (!doors[stop.stationName]) console.log(stop.stationName)
    let rawDoorSide = doors[stop.stationName][platformInt]

    let direction = trip.runData.direction.railDirection
    if (stop.stationName === 'Flinders Street') direction = getFSSDirection(trip)
    if (stop.stationName === 'Town Hall') direction = getTHLDirection(trip)

    stop.doorSide = accountForDirection(direction, rawDoorSide)
  })
}

