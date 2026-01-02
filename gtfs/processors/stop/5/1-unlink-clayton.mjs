export default function processStop(stop) {
  if (stop.stopGTFSID === '10480' && stop.fullStopName === 'Clayton Railway Station/Haughton Road' && stop.parentStopGTFSID === '4649') {
    stop.parentStopGTFSID = null
  }

  if (stop.stopGTFSID === '4649' && stop.fullStopName === 'Clayton Railway Station/Haughton Road') return null

  return stop
}