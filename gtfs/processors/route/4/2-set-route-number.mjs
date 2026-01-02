export default function processRoute(route) {
  const wallanParts = route.routeGTFSID.match(/4-WN(\d)/)
  if (wallanParts) {
    route.routeNumber = wallanParts[1]
  } else if (route.routeName.match(/wallan/i) && route.routeName.match(/link a/i)) {
    route.routeNumber = 'A'
  }

  return route
}