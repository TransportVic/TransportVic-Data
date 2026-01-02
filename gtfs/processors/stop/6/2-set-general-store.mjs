const WALPEUP = {
  type: 'Point',
  coordinates: [
    142.02396078037899, -35.13599577131276
  ]
}

const UNDERBOOL = {
  type: 'Point',
  coordinates: [
    141.8110141365467, -35.16992749794159
  ]
}

export default function checkOUY_PIN_GeneralStore(stop) {
  if (stop.fullStopName === 'General Store/Mallee Highway') {
    if (distance(WALPEUP, stop.location) < 0.5) {
      stop.fullStopName = 'Walpeup General Store/Mallee Highway'
    } else if (distance(UNDERBOOL, stop.location) < 0.5) {
      stop.fullStopName = 'Underbool General Store/Mallee Highway'
    }
  }

  return stop
}