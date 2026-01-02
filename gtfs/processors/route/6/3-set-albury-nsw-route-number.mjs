export default function processRoute(route) {
  if (!route.routeNumber) return route

  const routeNumberParts = route.routeNumber.match(/^NSW(\d+)$/)
  if (routeNumberParts) route.routeNumber = routeNumberParts[1]

  return route
}