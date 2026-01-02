import { expect } from 'chai'
import gtfsTrips from './gtfs-trips/overland.json' with { type: 'json' }
import processTrip from '../gtfs/processors/trip/10/1-set-tdn.mjs'

describe('The overland trip processor (mode 10)', () => {
  it('Sets an AM8 runID on Melbourne bound trips', () => {
    expect(processTrip(gtfsTrips[0]).runID).to.match(/\dAM8$/)
  })

  it('Sets an MA8 runID on Adelaide bound trips', () => {
    expect(processTrip(gtfsTrips[1]).runID).to.match(/\dMA8$/)
  })

  it('Uses the day of the week (1 for Sunday) as the first digit', () => {
    expect(processTrip(gtfsTrips[0]).runID).to.match(/^1/) // Sunday 1AM8
    expect(processTrip(gtfsTrips[1]).runID).to.match(/^2/) // Monday 2MA8
  })
})