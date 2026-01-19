export default function setSpringhurst(stop) {
  if (stop.stopGTFSID === '22490' && stop.fullStopName === 'STOP 1620') {
    stop.fullStopName = 'Springhurst Railway Station/Silo Street'
  }

  return stop
}