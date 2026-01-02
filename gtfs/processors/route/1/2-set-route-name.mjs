import vlineRoutes from '../../../../excel/rail/vline-route-names/routes.json' with { type: 'json' }

const VLINE_ROUTES = {
  ...vlineRoutes,
  ...Object.keys(vlineRoutes).reduce((acc, railID) => ({ ...acc, [`5-${railID.slice(-3)}`]: vlineRoutes[railID] }), {})
}

export default function processRoute(route) {
  if (VLINE_ROUTES[route.routeGTFSID]) {
    route.routeName = VLINE_ROUTES[route.routeGTFSID]
  }
  return route
}