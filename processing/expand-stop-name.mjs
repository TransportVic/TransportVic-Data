let roadTypes = {
  'Rd Rd': 'Road',
  'Rd': 'Road',
  'Pde': 'Parade',
  'Cl': 'Close',
  'Dr': 'Drive',
  'Gr': 'Grove',
  'Ct': 'Court',
  'Hwy': 'Highway',
  'Fwy': 'Freeway',
  'Tce': 'Terrace',
  'Crst': 'Crescent',
  'Cr': 'Crescent',
  'Cres': 'Crescent',
  'Pl': 'Place',
  'Blvd': 'Boulevard',
  'Bvd': 'Boulevard',
  'Ctr': 'Centre',
  'Prom': 'Promenade',
  'Esp': 'Esplanade',
  'Cct': 'Circuit',
  'Sq': 'Square',
  'Cir': 'Circle',
  'Con': 'Concourse',
  'Ch': 'Chase',
  'Gra': 'Grange',
  'Grn': 'Green',
  'Gtwy': 'Gateway',
  'Psge': 'Passage',
  'Rdge': 'Ridge',
  'Strp': 'Strip',
  'Trk': 'Track',
  'Vsta': 'Vista',
  'Pkwy': 'Parkway',
  'Devn': 'Deviation',
}

export function expandRoadType(stopName) {
  for (let name of Object.keys(roadTypes)) {
    stopName = stopName.replace(new RegExp(name + '$'), roadTypes[name])
  }

  return stopName.replace(/ St St$/, ' Street')
    .replace(/St$/, 'Street')
    .replace(/St S(th)?$/, 'Street South')
    .replace(/St N$/, 'Street North')
    .replace(/St -/g, 'Street -')
    .replace(/Mt\.? /g, 'Mount ')
    .replace(/ Ave?(\b)/g, ' Avenue$1') // Cannot be at the start of a stop name, eg Ave Maria College
    .replace(/Lt$/g, 'Little')
    .replace(/Lwr$/g, 'Lower')
    .replace(/Sth$/g, 'South')
    .replace(/Nth$/g, 'North')
    .replace(/Gdn(s?)$/g, 'Garden$1')
    .replace(/Plza$/g, 'Plaza')
    .replace(/Tafe$/g, 'TAFE')
    .replace(/Cresent/g, 'Crescent')
    .replace(/([\w ]*?) ?- ?([\w ]*?) Road/g, '$1-$2 Road')
    .replace(/^(\d* ?)St /, '$1St. ')
}

export function expandStopName(stopName) {
  return stopName
    .replace(/ PS$/g, ' Primary School')
    .replace(/Uni$/g, 'University')
    .replace(/ HS$/g, ' High School')
    .replace(/Repat(\b)/g, 'Repatriation$1')
    .replace(/(\b)MC(\b)/g, '$1Medical Centre$2')
    .replace(/Sec Col(\b)/g, 'Secondary College$1')
    .replace(/Sec College(\b)/g, 'Secondary College$1')
    .replace(/SC Senior Campus(\b)/g, 'Secondary College Senior Campus$1') // Required for Mill Park SC Senior Campus
    .replace(/Rec Res\w*(\b)/g, 'Recreation Reserve$1')
    .replace(/ SC(\b)/, ' Shopping Centre$1')
    .replace('Ret Village', 'Retirement Village')
}

export function expandStation(stopName) {
  let isSpecialStation = (
    stopName.includes('Police Station') || stopName.includes('Service Station')
    || stopName.includes('Fire Station') || stopName.includes('Petrol Station')
    || stopName.includes('Caltex Station') || stopName.match(/Station (St|Rd|Av|Pde)/)
    || stopName.match(/CFA (Fire )?Station/) || stopName.match(/[\d]+\w? Station/)
    || stopName.includes('Bus Station') || stopName.includes('Railway Station')
  )

  if (isSpecialStation) return stopName

  return stopName.replace(' Station', ' Railway Station')
}

export function cleanupMCG(stopName) {
  if (stopName.includes('Jolimont') && stopName.includes('MCG')) {
    return stopName.replace('-MCG', '')
  }

  return stopName
}

export default function processName(stopName) {
  let cleanedMCG = cleanupMCG(stopName)
  let stationExpanded = expandStation(cleanedMCG)
  let roadExpanded = expandRoadType(stationExpanded)
  let nameExpanded = expandStopName(roadExpanded)

  return nameExpanded
}