export default function processRoute(route) {
  if (route.operators[0] === 'Unknown') route.operators = ['Journey Beyond']

  return route
}