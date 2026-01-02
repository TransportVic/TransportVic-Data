export default function processStop(stop) {
  if (stop.stopGTFSID === 'vic:rail:STL') {
    stop.stopGTFSID = 'vic:rail:STL-V'
  } else if (stop.parentStopGTFSID === 'vic:rail:STL') {
    stop.parentStopGTFSID = 'vic:rail:STL-V'
  }

  return stop
}