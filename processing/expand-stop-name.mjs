export default function expandStopName(stopName) {
  return stopName.replace(/ St St$/, ' Street')
    .replace(/St$/, 'Street')
    .replace(/St S(th)?$/, 'Street South')
    .replace(/St N$/, 'Street North')
    .replace(/St -/g, 'Street -')
    .replace(/Rd Rd$/, 'Road')
    .replace(/Rd$/g, 'Road')
    .replace(/Mt\.? /g, 'Mount ')
    .replace(/Pde$/g, 'Parade')
    .replace(/Cl$/g, 'Close')
    .replace(/Dr$/g, 'Drive')
    .replace(/ Ave?(\b)/g, ' Avenue$1') // Cannot be at the start of a stop name, eg Ave Maria College
    .replace(/Gr$/g, 'Grove')
    .replace(/Ct$/g, 'Court')
    .replace(/Cr$/g, 'Crescent')
    .replace(/Hwy$/g, 'Highway')
    .replace(/Fwy$/g, 'Freeway')
    .replace(/Tce$/g, 'Terrace')
    .replace(/Crst$/g, 'Crescent')
    .replace(/Pl$/g, 'Place')
    .replace(/Bl?vd$/g, 'Boulevard')
    .replace(/Cres$/g, 'Crescent')
    .replace(/Ctr$/g, 'Centre')
    .replace(/Lt$/g, 'Little')
    .replace(/Lwr$/g, 'Lower')
    .replace(/Prom$/g, 'Promenade')
    .replace(/Esp$/g, 'Esplanade')
    .replace(/Cct$/g, 'Circuit')
    .replace(/Sq$/g, 'Square')
    .replace(/Sth$/g, 'South')
    .replace(/Nth$/g, 'North')
    .replace(/Gdn(s?)$/g, 'Garden$1')
    .replace(/Cir$/g, 'Circle')
    .replace(/Con$/g, 'Concourse')
    .replace(/Ch$/g, 'Chase')
    .replace(/Gra$/g, 'Grange')
    .replace(/Grn$/g, 'Green')
    .replace(/Gtwy$/g, 'Gateway')
    .replace(/Plza$/g, 'Plaza')
    .replace(/Psge$/g, 'Passage')
    .replace(/Rdge$/g, 'Ridge')
    .replace(/Strp$/g, 'Strip')
    .replace(/Tafe$/g, 'TAFE')
    .replace(/Trk$/g, 'Track')
    .replace(/Vsta$/g, 'Vista')
    .replace(/Pkwy$/g, 'Parkway')
    .replace(/Devn$/g, 'Deviation')
    .replace(/Cresent/g, 'Crescent')

    .replace(/ PS$/g, ' Primary School')
    .replace(/Uni$/g, 'University')
    .replace(/([\w ]*?) ?- ?([\w ]*?) Road/g, '$1-$2 Road')
    .replace(/^(\d* ?)St /, '$1St. ')
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