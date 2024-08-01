import { expect } from 'chai'
import LIL_FSS_VLP from './doors-pattern/lil-fss-vlp.json' with { type: 'json' }
import MDD_FSS_DIR from './doors-pattern/mdd-fss-direct.json' with { type: 'json' }
import FSS_BEG_DIR from './doors-pattern/fss-beg-direct.json' with { type: 'json' }
import SUY_FSS_SSS from './doors-pattern/suy-fss-sss.json' with { type: 'json' }
import SUY_FSS_VLP from './doors-pattern/suy-fss-vlp.json' with { type: 'json' }
import FSS_HBE_VLP from './doors-pattern/fss-hbe-vlp.json' with { type: 'json' }
import CCL_VLP from './doors-pattern/ccl-vlp.json' with { type: 'json' }
import FSS_SUY_VLP from './doors-pattern/fss-suy-vlp.json' with { type: 'json' }

import appendDoorsData from '../sample/get-doors.mjs'

describe('The door side calculation', () => {
  appendDoorsData(LIL_FSS_VLP)
  appendDoorsData(MDD_FSS_DIR)
  appendDoorsData(FSS_BEG_DIR)
  appendDoorsData(SUY_FSS_SSS)
  appendDoorsData(SUY_FSS_VLP)
  appendDoorsData(FSS_HBE_VLP)
  appendDoorsData(CCL_VLP)
  appendDoorsData(FSS_SUY_VLP)

  it('Should reverse the door side for Up trips', () => {
    expect(LIL_FSS_VLP.stops[0].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stops[3].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stops[6].doorSide).to.equal('R')
    expect(LIL_FSS_VLP.stops[11].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stops[12].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stops[15].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stops[16].doorSide).to.equal('R')
  })

  it('Should handle Flinders Street specially, treating Westbound travel as Down', () => {
    expect(MDD_FSS_DIR.stops[0].doorSide).to.equal('R')
    expect(MDD_FSS_DIR.stops[23].doorSide).to.equal('L')
    expect(MDD_FSS_DIR.stops[24].doorSide).to.equal('R')
  })

  it('Down Belgrave direct from FSS - RMD', () => {
    expect(FSS_BEG_DIR.stops[0].doorSide).to.equal('R')
  })

  it('Up Sunbury direct from NME - SSS - FSS', () => {
    expect(SUY_FSS_SSS.stops[12].doorSide).to.equal('L')
    expect(SUY_FSS_SSS.stops[13].doorSide).to.equal('R')
    expect(SUY_FSS_SSS.stops[14].doorSide).to.equal('L')
  })

  it('Down Hurstbridge via loop', () => {
    expect(FSS_HBE_VLP.stops[0].doorSide).to.equal('R')
    expect(FSS_HBE_VLP.stops[1].doorSide).to.equal('L')
    expect(FSS_HBE_VLP.stops[2].doorSide).to.equal('L')
    expect(FSS_HBE_VLP.stops[24].doorSide).to.equal('L')
  })

  it('Down city circle via Southern Cross', () => {
    expect(CCL_VLP.stops[0].doorSide).to.equal('L')
    expect(CCL_VLP.stops[1].doorSide).to.equal('L')
    expect(CCL_VLP.stops[5].doorSide).to.equal('L')
  })

  it('Down Sunbury via loop', () => {
    expect(FSS_SUY_VLP.stops[0].doorSide).to.equal('L')
    expect(FSS_SUY_VLP.stops[1].doorSide).to.equal('R')
    expect(FSS_SUY_VLP.stops[5].doorSide).to.equal('L')
  })

  it('Up Sunbury via loop', () => {
    expect(SUY_FSS_VLP.stops[0].doorSide).to.equal('R')
    expect(SUY_FSS_VLP.stops[12].doorSide).to.equal('L')
    expect(SUY_FSS_VLP.stops[13].doorSide).to.equal('L')
    expect(SUY_FSS_VLP.stops[16].doorSide).to.equal('R')
  })
})