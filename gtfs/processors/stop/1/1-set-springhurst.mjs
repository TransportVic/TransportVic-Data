export default function setSpringhurst(stop) {
  if (stop.stopGTFSID === '1620' && stop.fullStopName === '') {
    stop.fullStopName = 'Springhurst Railway Station'
    stop.stopGTFSID = 'vic:rail:SHT'
  }

  if (stop.stopGTFSID === '22490' && stop.fullStopName === 'Springhurst Railway Station') {
    stop.parentStopGTFSID = 'vic:rail:SHT'
  }

  return stop
}