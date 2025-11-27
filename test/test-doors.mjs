import { expect } from 'chai'
import LIL_FSS_VLP from './doors-pattern/lil-fss-vlp.json' with { type: 'json' }
import MDD_FSS_DIR from './doors-pattern/mdd-fss-direct.json' with { type: 'json' }
import FSS_BEG_DIR from './doors-pattern/fss-beg-direct.json' with { type: 'json' }
import SUY_FSS_SSS from './doors-pattern/suy-fss-sss.json' with { type: 'json' }
import SUY_FSS_VLP from './doors-pattern/suy-fss-vlp.json' with { type: 'json' }
import FSS_HBE_VLP from './doors-pattern/fss-hbe-vlp.json' with { type: 'json' }
import CCL_VLP from './doors-pattern/ccl-vlp.json' with { type: 'json' }
import FSS_SUY_VLP from './doors-pattern/fss-suy-vlp.json' with { type: 'json' }
import MTP_ANZ_THL from './doors-pattern/mtp-anz-thl.json' with { type: 'json' }
import MTP_THL_AEN from './doors-pattern/mtp-thl-aen.json' with { type: 'json' }

import appendDoorsData from '../sample/get-doors.mjs'

const clone = o => JSON.parse(JSON.stringify(o))

const MTP_ANZ_THL_2 = clone(MTP_ANZ_THL)
const MTP_THL_AEN_2 = clone(MTP_THL_AEN)
MTP_ANZ_THL_2.stopTimings.slice(1).forEach(stop => stop.platform = '2')
MTP_THL_AEN_2.stopTimings.slice(0, -1).forEach(stop => stop.platform = '2')

const MTP_AEN_THL = clone(MTP_THL_AEN)
MTP_AEN_THL.stopTimings.reverse()
MTP_AEN_THL.direction = 'Up'

const MTP_THL_ANZ = clone(MTP_ANZ_THL)
MTP_THL_ANZ.stopTimings.reverse()
MTP_THL_ANZ.direction = 'Down'

describe('The door side calculation', () => {
  appendDoorsData(LIL_FSS_VLP)
  appendDoorsData(MDD_FSS_DIR)
  appendDoorsData(FSS_BEG_DIR)
  appendDoorsData(SUY_FSS_SSS)
  appendDoorsData(SUY_FSS_VLP)
  appendDoorsData(FSS_HBE_VLP)
  appendDoorsData(CCL_VLP)
  appendDoorsData(FSS_SUY_VLP)
  appendDoorsData(MTP_ANZ_THL)
  appendDoorsData(MTP_THL_AEN)

  appendDoorsData(MTP_ANZ_THL_2)
  appendDoorsData(MTP_THL_AEN_2)

  appendDoorsData(MTP_AEN_THL)
  appendDoorsData(MTP_THL_ANZ)

  it('Should reverse the door side for Up trips', () => {
    expect(LIL_FSS_VLP.stopTimings[0].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stopTimings[3].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stopTimings[6].doorSide).to.equal('R')
    expect(LIL_FSS_VLP.stopTimings[11].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stopTimings[12].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stopTimings[15].doorSide).to.equal('L')
    expect(LIL_FSS_VLP.stopTimings[16].doorSide).to.equal('R')
  })

  it('Should handle Flinders Street specially, treating Westbound travel as Down', () => {
    expect(MDD_FSS_DIR.stopTimings[0].doorSide).to.equal('R')
    expect(MDD_FSS_DIR.stopTimings[23].doorSide).to.equal('L')
    expect(MDD_FSS_DIR.stopTimings[24].doorSide).to.equal('R')
  })

  it('Down Belgrave direct from FSS - RMD', () => {
    expect(FSS_BEG_DIR.stopTimings[0].doorSide).to.equal('R')
  })

  it('Up Sunbury direct from NME - SSS - FSS', () => {
    expect(SUY_FSS_SSS.stopTimings[12].doorSide).to.equal('L')
    expect(SUY_FSS_SSS.stopTimings[13].doorSide).to.equal('R')
    expect(SUY_FSS_SSS.stopTimings[14].doorSide).to.equal('L')
  })

  it('Down Hurstbridge via loop', () => {
    expect(FSS_HBE_VLP.stopTimings[0].doorSide).to.equal('R')
    expect(FSS_HBE_VLP.stopTimings[1].doorSide).to.equal('L')
    expect(FSS_HBE_VLP.stopTimings[2].doorSide).to.equal('L')
    expect(FSS_HBE_VLP.stopTimings[24].doorSide).to.equal('L')
  })

  it('Down city circle via Southern Cross', () => {
    expect(CCL_VLP.stopTimings[0].doorSide).to.equal('L')
    expect(CCL_VLP.stopTimings[1].doorSide).to.equal('L')
    expect(CCL_VLP.stopTimings[5].doorSide).to.equal('L')
  })

  it('Down Sunbury via loop', () => {
    expect(FSS_SUY_VLP.stopTimings[0].doorSide).to.equal('L')
    expect(FSS_SUY_VLP.stopTimings[1].doorSide).to.equal('R')
    expect(FSS_SUY_VLP.stopTimings[5].doorSide).to.equal('L')
  })

  it('Up Sunbury via loop', () => {
    expect(SUY_FSS_VLP.stopTimings[0].doorSide).to.equal('R')
    expect(SUY_FSS_VLP.stopTimings[12].doorSide).to.equal('L')
    expect(SUY_FSS_VLP.stopTimings[13].doorSide).to.equal('L')
    expect(SUY_FSS_VLP.stopTimings[16].doorSide).to.equal('R')
  })

  it('Hawksburn to Town Hall', () => {
    expect(MTP_ANZ_THL.stopTimings[0].doorSide).to.equal('L')
    expect(MTP_ANZ_THL.stopTimings[1].doorSide).to.equal('R')
    expect(MTP_ANZ_THL.stopTimings[2].doorSide).to.equal('R')
  })

  it('Town Hall to West Footscray', () => {
    expect(MTP_THL_AEN.stopTimings[0].doorSide).to.equal('R')
    expect(MTP_THL_AEN.stopTimings[1].doorSide).to.equal('R')
    expect(MTP_THL_AEN.stopTimings[2].doorSide).to.equal('R')
    expect(MTP_THL_AEN.stopTimings[3].doorSide).to.equal('R')
    expect(MTP_THL_AEN.stopTimings[4].doorSide).to.equal('R')
  })

  it('Hawksburn to Town Hall using P2', () => {
    expect(MTP_ANZ_THL_2.stopTimings[0].doorSide).to.equal('L')
    expect(MTP_ANZ_THL_2.stopTimings[1].doorSide).to.equal('L')
    expect(MTP_ANZ_THL_2.stopTimings[2].doorSide).to.equal('L')
  })

  it('Town Hall to West Footscray using P2', () => {
    expect(MTP_THL_AEN_2.stopTimings[0].doorSide).to.equal('L')
    expect(MTP_THL_AEN_2.stopTimings[1].doorSide).to.equal('L')
    expect(MTP_THL_AEN_2.stopTimings[2].doorSide).to.equal('L')
    expect(MTP_THL_AEN_2.stopTimings[3].doorSide).to.equal('L')
    expect(MTP_THL_AEN_2.stopTimings[4].doorSide).to.equal('R')
  })


  it('West Footscray to Town Hall', () => {
    expect(MTP_AEN_THL.stopTimings[0].doorSide).to.equal('L')
    expect(MTP_AEN_THL.stopTimings[1].doorSide).to.equal('L')
    expect(MTP_AEN_THL.stopTimings[2].doorSide).to.equal('L')
    expect(MTP_AEN_THL.stopTimings[3].doorSide).to.equal('L')
    expect(MTP_AEN_THL.stopTimings[4].doorSide).to.equal('L')
  })

  it('Town Hall to Hawksburn', () => {
    expect(MTP_THL_ANZ.stopTimings[0].doorSide).to.equal('L')
    expect(MTP_THL_ANZ.stopTimings[1].doorSide).to.equal('L')
    expect(MTP_THL_ANZ.stopTimings[2].doorSide).to.equal('R')
  })
})