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
  ["BBN.W204", "LAB.P1", false, 3+4+3+228+337+104+161/2 - 161.3],

  ["LAB.P1", "BOX.W201D", false, 161/2+16+464+228+317+138],
  ["BOX.W208", "LAB.P2", false, 161/2+16+464+228+317+138],
  ["BOX.P4", "BOX.W208", false, 162/2+8+393],
  ["BOX.P3", "BOX.W201U", true, 162/2+8+290],
  ["BOX.W201U", "BOX.W208", true, 393 - 290],
  ["BOX.P2", "BOX.W201D", true, 162/2+8+2+386],
  ["BOX.W201U", "BOX.W201D", true, 2+386-290],

  ["BOX.W216D", "BOX.P4", false, 162/2+125-108],
  ["BOX.W226D", "BOX.P3", true, 162/2+125-108],
  ["BOX.W216U", "BOX.W216D", false, 108-24],
  ["BOX.W216U", "BOX.W226D", true, 108-24],
  ["BOX.W226U", "BOX.W226D", true, 125 - 1 - 22 - (125-108)],
  ["BOX.W226U", "BOX.P2", true, 162/2+9+103],

  ["BOX.W204U", "BOX.W216D", false, 108+246-4],
  ["BOX.W204U", "BOX.W204D", false, 98.3],
  ["BOX.W214U", "BOX.W204D", true, 97.9],
  ["BOX.W214U", "BOX.W214D", true, 98.3],

  ["BOX.W204D", "BOX.W216U", true, 169],
  ["BOX.W214D", "BOX.W226U", true, 169],

  ["UNN.P3", "BOX.W204U", false, 160/2+48+302+145+111+453+382+4],
  ["UNN.P2", "BOX.W214U", true, 160/2+48+302+145+111+453+382+4],
  ["BOX.W214D", "UNN.P1", false, 160/2+392+103+158+185+221+382+101.4],

  ["CBY.P3", "CHM.P3", false, 160/2+4+396+129+125+160/2],
  ["CBY.P2", "CHM.P2", true, 159/2+4+118+153+125+174+159/2],
  ["CHM.P1", "CBY.P1", false, 159/2+4+118+153+125+174+159/2],

  ["CHM.P3", "UNN.P3", false, 160/2+22+199+284+116+124+219+160/2],
  ["CHM.P2", "UNN.P2", true, 159/2+103+205+284+161+240+52+160/2],
  ["UNN.P1", "CHM.P1", false, 159/2+103+205+284+161+240+52+160/2],

  ["ECM.P3", "CHM.P3", false, 159/2+13+287+283+226+155+160/2],
  ["ECM.P2", "CHM.P2", true, 159/2+14+367+266+299+18+159/2],
  ["CHM.P1", "ECM.P1", false, 159/2+14+367+266+299+18+159/2],

  ["ECM.P1", "CAM.W243", false, 107+187+11+159/2],
  ["CAM.W211D", "ECM.P3", false, 99+159+45+159/2],
  ["CAM.W211U", "ECM.P2", true, 59.7 + 99+159+45+159/2],
  ["CAM.W221D", "CAM.W211U", true, 7.2],
  ["CAM.W221U", "CAM.W221D", true, 60.1],
  ["CAM.W221U", "CAM.W243", true, 131],

  ["CAM.W231U", "CAM.W231D", true, 59.8],
  ["CAM.W231U", "CAM.W221D", true, 158.8],
  ["CAM.W231D", "CAM.W221U", true, 39.1],
  ["CAM.W226D", "CAM.W231D", true, 32.6],
  ["CAM.W206", "CAM.W211D", false, 274.3],
  ["CAM.W216U", "CAM.W216D", false, 49.5],
  
  ["CAM.P3", "CAM.W216U", false, 51.4 + (135+27)/2],
  ["CAM.P2", "CAM.W216D", true, 111 + (135+27)/2],
  ["CAM.P1", "CAM.W226D", true, 197.4 + (135+27)/2],
  ["CAM.W216D", "CAM.W231U", true, 58.6],
  ["CAM.W216U", "CAM.W206", false, 69.43],

  ["CAM.W204", "CAM.P3", false, 51.1 + (135+27)/2],
  ["CAM.W214U", "CAM.W214D", true, 66.2],
  ["CAM.W214D", "CAM.P2", true, 42.1 + (135+27)/2],
  ["CAM.W227", "CAM.P1", true, 46.7 + (135+27)/2],
  ["CAM.W217", "CAM.W227", true, 108.7],
  ["CAM.W207", "CAM.W217", true, 12],
  ["CAM.W224D", "CAM.W214U", true, 57.5],

  ["ASH.P1", "ALM.P1", true, 158/2+199+357+160/2],

  ["BWD.P2", "ASH.W3D", false, 161/2+495+203+193+17+139 - 28.9 - 52.5],
  ["ASH.W3D", "ASH.W7", true, 52.5],
  ["ASH.P1", "ASH.W7", true, 158/2 + 28.9],
  ["ASH.W7", "BWD.P1", false, 161/2+494+525+23 - 28.9],

  ["HWL.P2", "BWD.P2", false, 161/2+326+469+19+161/2],
  ["BWD.P1", "HWL.P2", false, 161/2+14+488+312+161/2],

  ["WSN.P2", "HWL.P2", false, 161/2+116+495+275+161/2],
  ["HWL.P1", "WSN.P2", false, 161/2+255+505+116+161/2],

  ["RIV.P2", "WSN.P2", false, 159/2+6+106+235+161/2],
  ["WSN.P1", "RIV.P2", false, 161/2+235+76+158/2],

  ["CAM.W206", "RIV.W14D", false, 737+325+182+62.5 - 74.5 - 100], // - 100M to bias it to use this track for Down trains
  ["RIV.W14D", "RIV.P2", true, 118.5 + 159/2],
  ["RIV.P1", "RIV.W14U", false, 158/2 + 200.3],
  ["RIV.W14U", "RIV.W14D", true, 57],
  ["CAM.W243", "RIV.W14U", true, 160 + 7 + 331 + 338 + 83 + 7 - 200.3],

  ["AUB.P3", "CAM.W204", false, 157/2+4+4+442+223+295+135 - 51.1],
  ["AUB.P2", "CAM.W224D", true, 157+110+8+157+151+223+295 - 32.6],
  ["CAM.W207", "AUB.P1", false, 157+110+8+157+151+223+295 - 29.1],

  ["GFE.P3", "AUB.P3", false, 158/2+14+315+218+140+157/2],
  ["GFE.P2", "AUB.P2", true, 158/2+109+2+237+210+5+124+157/2],
  ["AUB.P1", "GFE.P1", false, 158/2+109+2+237+210+5+124+157/2],

  ["HAW.P3", "GFE.P3", false, (152+6+13)/2+(215-13)+354+218+177+125+158/2],
  ["HAW.P2", "GFE.P2", true, (7+152)/2+6+215+354+267+4+120+158/2],
  ["GFE.P1", "HAW.P1", false, 158/2+4+166+138+269+267+4+120+158/2]

]