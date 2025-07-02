import { backtrack, dijkstra, Graph, Vertex } from '@transportme/graph'
import locations from './locations.json' with { type: 'json' }
import paths from './paths.mjs'

let graph = new Graph()

for (let locationID of Object.keys(locations)) {
  for (let subLocation of locations[locationID]) {
    graph.add(new Vertex(`${locationID}.${subLocation}`))
  }
}

for (let path of paths) {
  if (!graph.get(path[0])) console.log('Invalid vertex', path[0], path)
  if (!graph.get(path[1])) console.log('Invalid vertex', path[1], path)

  graph.addEdge(path[0], path[1], { weight: path[3], bidirectional: path[2] })
}

let origin = 'RIV.P2'
let destination = 'CAM.P1'

let { pred, dist } = dijkstra(graph, origin, destination)
if (!pred[destination]) console.log('No path found')
else {
  console.log(backtrack(graph, pred, destination).map(station => station.getName()))
  console.log('Distance:', dist[destination])
}