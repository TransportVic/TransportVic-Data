export default async function processRoute(route, dbStops, dbRoutes) {
  if (route.routeGTFSID === '6-855') {
    const smartrakVersion = await dbRoutes.findDocument({ routeGTFSID: '4-855' })
    if (smartrakVersion) return null
  }

  return route
}