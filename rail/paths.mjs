export default [
  ["LIL.W242", "LIL.P1", true, 163/2+30+149],
  ["LIL.W242", "LIL.P2", true, 163/2+30+149],
  ["MLK.W251", "LIL.W242", true, 1492-149+1231+892+163],

  ["MLK.P1", "MLK.W251", true, 335+34+163/2],
  ["MLK.P2", "MLK.W251", false, 335+34+163/2],
  ["MLK.W220D", "MLK.P1", true, 163/2+286],
  ["MLK.W220U", "MLK.W220D", false, 480-106-286],
  ["MLK.W220U", "MLK.P2", false, 163/2+480-106],

  ["CDN.P2", "MLK.W220U", false, 106+430+581+714+1008+36+162/2],
  ["MLK.W220D", "CDN.P1", false, 568-286+724+597+979+356+162/2],

  ["CDN.P1", "RWE.P1", false, 162/2+751+624+1070+495+268+162/2],
  ["RWE.P2", "CDN.P2", false, 162/2+20+668+1140+787+625+162/2],

  ["RWD.W205D", "RWE.P2", false, 925-207+782+162/2],
  ["RWE.P1", "RWD.W225", false, 925-207+782+162/2],

  ["RWD.W205U", "RWD.W225", true, 32.8],
  ["RWD.W205U", "RWD.W205D", true, 59.4],
  ["RWD.W204U", "RWD.W205D", true, 181.3],
  ["RWD.W224", "RWD.W204D", true, 84.5],
  ["RWD.W204D", "RWD.W234D", true, 30.4],
  ["RWD.W204U", "RWD.W204D", true, 53.66],
  ["RWD.W234D", "RWD.W205U", true, 38.8],
  ["RWD.W234U", "RWD.W235", true, 18],
  ["RWD.W234U", "RWD.W234D", true, 52.4],
  ["RWD.W224", "RWD.W235", true, 79.4],
  ["RWD.W202U", "RWD.W202D", false, 52.9],
  ["RWD.W202D", "RWD.W233", false, 56.4],
  ["RWD.P1", "RWD.W234U", true, 65.7 + (26+15+118)/2],
  ["RWD.P1", "RWD.W233", false, 94.6 + (26+15+118)/2],
  ["RWD.P2", "RWD.W224", true, 2 + (26+15+118)/2],
  ["RWD.P2", "RWD.W202D", true, 38.5 + (26+15+118)/2],
  ["RWD.W202U", "RWD.P3", false, 118.6 + (14+117+28)/2],
  ["RWD.P3", "RWD.W204U", true, 4 + (14+117+28)/2],
  ["HTD.P2", "RWD.W202U", false, 217+282+686+20+164/2 - 118.6],
  ["RWD.W233", "HTD.P1", false, 347+4+510+315+164/2 - 94.6],

  ["HTD.P1", "MCH.P1", false, 164/2+20+474+580+323+379+160/2],
  ["MCH.P2", "HTD.P2", false, 160/2+20+760+398+611+164/2],

  ["MCH.P1", "NWG.P1", false, 160/2+20+427+468+597+160/2],
  ["NWG.P2", "MCH.P2", false, 160/2+40+555+458+457+160/2],

  ["NWG.P1", "BBN.P1", false, 160/2+471+491+573+414+148/2],
  ["BBN.W206", "NWG.P2", false, 6+511+554+571+341+160/2 - 126],
  ["BBN.P3", "BBN.W206", false, 148/2 + 126],
  ["BBN.P2", "BBN.W206", 125.5],
  ["BBN.W202U", "BBN.P3", false, 241 + 148/2],
  ["BBN.W202D", "BBN.P2", true, 93.2 + 148/2],
  ["BBN.P1", "BBN.W204", false, 161.3 + 148/2],
  ["BBN.W202D", "BBN.W204", false, 76.6],
  ["BBN.W202U", "BBN.W202D", false, 148.5],

  ["LAB.P2", "BBN.W202U", false, 70+297+290+20+161/2 - 241],
  ["BBN.W204", "LAB.P1", false, 3+4+3+228+337+104+161/2 - 161.3]
]