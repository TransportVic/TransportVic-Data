import { expect } from 'chai'
import { isStreetStop, getPrimaryStopName, getSecondaryStopName } from '../stop-utils/stop-utils.mjs'

describe('The isStreetStop function', () => {
  it('Should return true if the primary stop name ends in a defined road type', () => {
    expect(isStreetStop('Llama Lane/Random Boulevard')).to.be.true
  })
  
  it('Should return true if there is just primary stop name that ends in a defined road type', () => {
    expect(isStreetStop('First Street')).to.be.true
  })
  
  it('Should not return true if the primary stop name contains but does not end in a defined road type', () => {
    expect(isStreetStop('The Avenue Shopping Centre/The Avenue')).to.be.false
  })
})

describe('The getPrimaryStopName function', () => {
  it('Should return the stop name up to the last instance of "/"', () => {
    expect(getPrimaryStopName('Dole Ave/Cheddar Rd')).to.equal('Dole Ave')
  })

  it('Should handle / appearing in a stop name', () => {
    expect(getPrimaryStopName('Casino/MCEC/Clarendon St')).to.equal('Casino/MCEC')
  })

  it('Should return the full name if there is no /', () => {
    expect(getPrimaryStopName('Southbank Tram Depot')).to.equal('Southbank Tram Depot')
  })
})

describe('The getSecondaryStopName function', () => {
  it('Should return the stop name up to the last instance of "/"', () => {
    expect(getSecondaryStopName('Dole Ave/Cheddar Rd')).to.equal('Cheddar Rd')
  })

  it('Should handle / appearing in a stop name', () => {
    expect(getSecondaryStopName('Casino/MCEC/Clarendon St')).to.equal('Clarendon St')
  })

  it('Should return the full name if there is no /', () => {
    expect(getSecondaryStopName('Southbank Tram Depot')).to.equal('')
  })
})
