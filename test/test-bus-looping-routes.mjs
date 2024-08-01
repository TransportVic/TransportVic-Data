import { expect } from 'chai'
import stops380CFull from './bus-looping-routes/380/clockwise-full.json' with { type: 'json' }
import stops380ACCroydon from './bus-looping-routes/380/anticlockwise-start-croydon.json' with { type: 'json' }
import stops380ACFull from './bus-looping-routes/380/anticlockwise-start-croydon.json' with { type: 'json' }

import stops443ACFull from './bus-looping-routes/443/anticlockwise.json' with { type: 'json' }
import stops443CFull from './bus-looping-routes/443/clockwise.json' with { type: 'json' }

import stops558ACDredge from './bus-looping-routes/558/anticlockwise-dredge.json' with { type: 'json' }
import stops558ACFull from './bus-looping-routes/558/anticlockwise-full.json' with { type: 'json' }
import stops558ACDeviation from './bus-looping-routes/558/anticlockwise-deviation.json' with { type: 'json' }

import stops558CDeviation from './bus-looping-routes/558/clockwise-deviation.json' with { type: 'json' }
import stops558CFull from './bus-looping-routes/558/clockwise-full.json' with { type: 'json' }
import stops558CCotchin from './bus-looping-routes/558/clockwise-cotchin.json' with { type: 'json' }

import stops965C from './bus-looping-routes/965/clockwise.json' with { type: 'json' }
import stops965AC from './bus-looping-routes/965/anticlockwise.json' with { type: 'json' }

import routes from '../bus/looping-routes/routes.js'

describe('The Looping Routes file', () => {
  describe('Route 380', () => {
    it('Should detect the 0537 clockwise departure correctly', () => {
      expect(routes['metro'][380](stops380CFull)).to.be.equal('Clockwise')
    })

    it('Should detect the 0600 from croydon anti-clockwise departure correctly', () => {
      expect(routes['metro'][380](stops380ACCroydon)).to.be.equal('Anti-Clockwise')
    })

    it('Should detect the 0602 anti-clockwise departure correctly', () => {
      expect(routes['metro'][380](stops380ACFull)).to.be.equal('Anti-Clockwise')
    })
  })

  describe('Route 443', () => {
    it('Should detect the 0537 clockwise departure correctly', () => {
      expect(routes['metro'][443](stops443CFull)).to.be.equal('Clockwise')
    })
    
    it('Should detect the 0625 anti-clockwise departure correctly', () => {
      expect(routes['metro'][443](stops443ACFull)).to.be.equal('Anti-Clockwise')
    })
  })

  describe('Route 558', () => {
    it('Should detect the 0609 dredge st anti-clockwise departure correctly', () => {
      expect(routes['metro'][558](stops558ACDredge)).to.be.equal('Anti-Clockwise')
    })
    
    it('Should detect the 0632 anti-clockwise departure correctly', () => {
      expect(routes['metro'][558](stops558ACFull)).to.be.equal('Anti-Clockwise')
    })
    
    it('Should detect the 0925 anti-clockwise departure deviation trip correctly', () => {
      expect(routes['metro'][558](stops558ACDeviation)).to.be.equal('Anti-Clockwise')
    })
    
    it('Should detect the 1203 clockwise departure deviation trip correctly', () => {
      expect(routes['metro'][558](stops558CDeviation)).to.be.equal('Clockwise')
    })
    
    it('Should detect the 1239 clockwise departure correctly', () => {
      expect(routes['metro'][558](stops558CFull)).to.be.equal('Clockwise')
    })
    
    it('Should detect the 2100 cotchin shortworking clockwise departure correctly', () => {
      expect(routes['metro'][558](stops558CCotchin)).to.be.equal('Clockwise')
    })
  })

  describe('Route 965', () => {
    it('Should detect the 0146 clockwise departure correctly', () => {
      expect(routes['metro'][965](stops965C)).to.be.equal('Clockwise')
    })
    
    it('Should detect the 0248 anti-clockwise departure correctly', () => {
      expect(routes['metro'][965](stops965AC)).to.be.equal('Anti-Clockwise')
    })
  })
})