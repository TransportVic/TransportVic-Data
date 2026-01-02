export default function processRoute(route) {
  if (route.operators[0] === 'Unknown') route.operators = ['SkyBus']
  route.routeName = route.routeName.replace(' Stn', '') + ' SkyBus'

  return route
}