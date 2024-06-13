module.exports = {
  'metro': {
    '280': 'Clockwise', // manningham loop
    '282': 'Anti-Clockwise', // manningham loop
    '380': stopTimings => { // croydon loop
      let norwood = stopTimings.findIndex(stop => stop.stopName.includes('Norwood Sec'))
      let burnt = stopTimings.findIndex(stop => stop.stopName.includes('Burnt Bridge'))
      if (norwood >= 0 && burnt >= 0 && burnt > norwood) return 'Clockwise'
      else return 'Anti-Clockwise'
    },
    '388': 'Anti-Clockwise', // mernda anticlockwise
    '389': 'Clockwise', // mernda clockwise
    '443': stopTimings => { // werribe southern loop
      let werPS = stopTimings.findIndex(stop => stop.stopName.includes('Werribee Primary School'))
      let mercy = stopTimings.findIndex(stop => stop.stopName.includes('Mercy Place Nursing Home'))
      if (mercy > werPS) return 'Anti-Clockwise'
      else return 'Clockwise'
    },
    '554': 'Clockwise', // thomastown Clockwise
    '557': 'Anti-Clockwise', // thomastown anticlockwise
    '558': stopTimings => { // reservoir anticlockwise
      let edgar = stopTimings.findIndex(stop => stop.stopName.includes('Edgars Creek Wetlands'))
      let cotchin = stopTimings.findIndex(stop => stop.stopName.includes('LE Cotchin Reserve'))
      if (edgar >= 0 && cotchin >= 0 && cotchin > edgar) return 'Clockwise'
      else return 'Anti-Clockwise'
    },
    '681': 'Clockwise', // lysterfield - knox city clockwise
    '682': 'Anti-Clockwise', // lysterfield - knox city anticlockwise
    '965': stopTimings => { // healesville loop
      let tudor = stopTimings.findIndex(stop => stop.stopName.includes('Tudor Village'))
      let tarrawarra = stopTimings.findIndex(stop => stop.stopName.includes('Tarrawarra Abbey'))

      if (tudor >= 0 && tarrawarra >= 0 && tarrawarra > tudor) return 'Clockwise'
      else return 'Anti-Clockwise'
    },
  }
}
