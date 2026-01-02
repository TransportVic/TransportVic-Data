export default function processStop(stop) {
  if (stop.stopGTFSID === '37229') {
    stop.fullStopName = 'Flora Avenue/Eleventh Street'
  } else if (stop.fullStopName === 'Flora') {
    stop.fullStopName = 'Flora Avenue/Eighth Street'
  }

  return stop
}