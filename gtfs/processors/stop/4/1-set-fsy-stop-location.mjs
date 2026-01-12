export default function processStop(stop) {
  if (stop.stopGTFSID === '12164') { // LIL P1
    stop.location.coordinates = [ -37.757343, 145.345720 ].reverse()
  } else if (stop.stopGTFSID === '12165') { // LIL P2
    stop.location.coordinates = [ -37.757306, 145.345646 ].reverse()
  }

  return stop
}