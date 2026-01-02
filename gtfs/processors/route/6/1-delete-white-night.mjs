export default function processRoute(route) {
  if (!route.routeNumber) return route
  if (route.routeNumber.match(/^WN\d+/)) return null

  return route
}