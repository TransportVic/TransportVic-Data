import { expect } from 'chai'
import { createTripProcessor } from '../gtfs/process.mjs'
import gtfsTrips from './gtfs-trips/overland.json' with { type: 'json' }

const tripProcessor = await createTripProcessor({ getCollection: () => {} })

describe('The overland trip processor (mode 10)', () => {
  it('Sets an AM8 runID on Melbourne bound trips', () => {
    expect(tripProcessor[10](gtfsTrips[0]).runID).to.match(/\dAM8$/)
  })

  it('Sets an MA8 runID on Adelaide bound trips', () => {
    expect(tripProcessor[10](gtfsTrips[1]).runID).to.match(/\dMA8$/)
  })

  it('Uses the day of the week (1 for Sunday) as the first digit', () => {
    expect(tripProcessor[10](gtfsTrips[0]).runID).to.match(/^1/) // Sunday 1AM8
    expect(tripProcessor[10](gtfsTrips[1]).runID).to.match(/^2/) // Monday 2MA8
  })
})