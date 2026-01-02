export default function processRoute(route) {
  if (!route.routeNumber) return route

  // Numbers with the town name eg Wallan 1, Barmah 8
  const routeNumberParts = route.routeNumber.match(/^[A-Z][a-z]+ (\d+)$/)
  if (routeNumberParts) route.routeNumber = parts[1]

  return route
}