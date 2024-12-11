const TRANSIT_MODES = {
  bus: 'bus',
  metroTrain: 'metro train',
  regionalTrain: 'regional train',
  regionalCoach: 'regional coach',
  tram: 'tram',
  ferry: 'ferry'
}

const GTFS_MODES = {
  1: TRANSIT_MODES.regionalTrain,
  2: TRANSIT_MODES.metroTrain,
  3: TRANSIT_MODES.tram,
  4: TRANSIT_MODES.bus,
  5: TRANSIT_MODES.regionalCoach,
  6: TRANSIT_MODES.bus,
  10: TRANSIT_MODES.regionalTrain,
  11: TRANSIT_MODES.bus
}

export {
  TRANSIT_MODES,
  GTFS_MODES
}