export default function setSpringhurst(stop) {
  if (stop.stopGTFSID === '1620' && stop.stopName === '') {
    stop.fullStopName = 'Springhurst Railway Station'
  }

  return stop
}