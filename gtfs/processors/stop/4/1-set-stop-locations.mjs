export default function processStop(stop) {
  if (stop.stopGTFSID === '40954') { // FSY Bay 6
    stop.location.coordinates = [ -37.800964140297744, 144.89999336149893 ].reverse()
  } else if (stop.stopGTFSID === '21174') { // FSY Bay 4
    stop.location.coordinates = [ -37.80089847127222, 144.89889056571604 ].reverse()
  } else if (stop.stopGTFSID === '21019') { // GYW Bay 10
    stop.location.coordinates = [ -37.879339121184024, 145.1622866072111 ].reverse()
  }

  return stop
}