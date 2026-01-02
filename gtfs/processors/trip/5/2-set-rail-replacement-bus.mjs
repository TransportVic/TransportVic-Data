import vlineRoutes from '../../../../excel/rail/vline-route-names/routes.json' with { type: 'json' }

const VLINE_ROUTES = {
  ...vlineRoutes,
  ...Object.keys(vlineRoutes).reduce((acc, railID) => ({ ...acc, [`5-${railID.slice(-3)}`]: vlineRoutes[railID] }), {})
}

export default function processTrip(trip) {
  if (trip.runID && trip.runID.match(/^\d{4}[a-zA-Z]/)) {
    if (VLINE_ROUTES[trip.routeGTFSID]) {
      trip.routeName = VLINE_ROUTES[trip.routeGTFSID]
    }

    trip.isRailReplacementBus = true
    trip.railRunID = trip.runID.slice(0, 4)
  }

  return trip
}