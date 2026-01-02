import metroOperators from '../../../../excel/bus/operators/metro-operators.json' with { type: 'json' }

export default function processRoute(route) {
  if (metroOperators[route.routeNumber]) route.operators = metroOperators[route.routeNumber]
  else console.log('Could not map operator for metro route', route.routeNumber, route.routeName)

  return route
}