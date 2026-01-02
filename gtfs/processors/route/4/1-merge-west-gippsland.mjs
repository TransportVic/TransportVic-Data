export default function processRoute(route) {
  if (route.routeGTFSID.match(/4-w\d\d/) || route.routeGTFSID.match(/4-V\d\d/) || route.routeGTFSID === '4-W88') {
    route.routeGTFSID = '4-WGT'
    route.routeName = 'West Gippsland Transit'
    route.routeNumber = null
  }

  return route
}