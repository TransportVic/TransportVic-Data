import processName, { expandRoadType, expandStation, cleanupMCG, expandStopName, amendStopDirection } from '../stop-utils/expand-stop-name.mjs'
import { expect } from 'chai'

describe('The road name expansion', () => {
  describe('The expansion of St', () => {
    it('Should expand St to Street only at the end of a name', () => {
      expect(expandRoadType('James St')).to.equal('James Street')
    })

    it('Should expand St if it is followed by a N or S', () => {
      expect(expandRoadType('Gillies St S')).to.equal('Gillies Street South')
      expect(expandRoadType('Gillies St N')).to.equal('Gillies Street North')
    })

    it('Should expand St if it is followed by a full direction such as North or South', () => {
      expect(expandRoadType('Railway St South')).to.equal('Railway Street South')
    })

    it('Should expand St if it is followed by a dash for a direction', () => {
      expect(expandRoadType('Prince St - East')).to.equal('Prince Street - East')
    })

    it('Should change St to St. if it appears at the front of the name', () => {
      expect(expandRoadType('St Peters College')).to.equal('St. Peters College')
    })

    it('Should change St to St. if there are numbers in front of it', () => {
      expect(expandRoadType('286 St Helena Rd')).to.equal('286 St. Helena Road')
    })

    it('Should not re-expand St.', () => {
      expect(expandRoadType('St. Ives Hotel')).to.equal('St. Ives Hotel')
    })
  })

  describe('The expansion of Ave', () => {
    it('Should expand Ave to Avenue only if there is a word in front of it', () => {
      expect(expandRoadType('Albert Ave')).to.equal('Albert Avenue')
    })

    it('Should not expand Avenue again', () => {
      expect(expandRoadType('The Avenue Shopping Centre')).to.equal('The Avenue Shopping Centre')
    })

    it('Should not expand Ave if it appears at the start of the name', () => {
      expect(expandRoadType('Ave Maria College')).to.equal('Ave Maria College')
    })
  })

  describe('The expansion of Mt', () => {
    it('Should expand Mt to Mount', () => {
      expect(expandRoadType('Mt Dandenong Road')).to.equal('Mount Dandenong Road')
    })

    it('Should expand Mt. to Mount, removing the dot', () => {
      expect(expandRoadType('Mt. Dandenong Road')).to.equal('Mount Dandenong Road')
    })
  })

  describe('Place - Place Road', () => {
    it('Should remove the space next to the hyphen', () => {
      expect(expandRoadType('Some Place Road - Other Place Road')).to.equal('Some Place Road-Other Place Road')
    })
  })

  describe('Deduplcation of errornous words', () => {
    it('Should deduplicate errornous Rd Rd stops', () => {
      expect(expandRoadType('Smythesdale-Snake Valley Rd Rd')).to.equal('Smythesdale-Snake Valley Road')
    })

    it('Should deduplicate errornous St St stops', () => {
      expect(expandRoadType('High St St')).to.equal('High Street')
    })

    it('Should not deduplicate Some St Sth', () => {
      expect(expandRoadType('Ward St Sth')).to.equal('Ward Street South')
    })
  })

  it('Should work even with a direction specified', () => {
    expect(expandRoadType('Tom Gr - North')).to.equal('Tom Grove - North')
  })

  it('Should work on the generic test cases', () => {
    expect(expandRoadType('Tom Gr')).to.equal('Tom Grove')
    expect(expandRoadType('Creswick Blvd')).to.equal('Creswick Boulevard')
    expect(expandRoadType('Pakenham Rd')).to.equal('Pakenham Road')
    expect(expandRoadType('Creswick Blvd')).to.equal('Creswick Boulevard')
  })
})

describe('The stop name expansion', () => {
  describe('The expansion of Rec Reserve', () => {
    it('Should expand just Rec Reserve', () => {
      expect(expandStopName('Edithvale Rec Reserve')).to.equal('Edithvale Recreation Reserve')
    })
    
    it('Should expand just Rec Res', () => {
      expect(expandStopName('Pakenham Rec Res')).to.equal('Pakenham Recreation Reserve')
    })
  })

  describe('The expansion of SC', () => {
    it('Should expand just SC', () => {
      expect(expandStopName('Edithvale SC')).to.equal('Edithvale Shopping Centre')
    })
  })
})

describe('The expansion of Station to Railway Station', () => {
  it('Should not expand things like Police Station, Service Station etc', () => {
    expect(expandStation('Police Station')).to.equal('Police Station')
    expect(expandStation('CFA Station')).to.equal('CFA Station')
    expect(expandStation('Service Station')).to.equal('Service Station')
    expect(expandStation('Caltex Station')).to.equal('Caltex Station')
  })

  it('Should not expand Station if there is a number in front of it', () => {
    expect(expandStation('opp 18 Station Lake Rd')).to.equal('opp 18 Station Lake Rd')
  })

  it('Should not re-expand Railway Station', () => {
    expect(expandStation('Huntingdale Railway Station')).to.equal('Huntingdale Railway Station')
  })

  it('Should expand Station in all other cases', () => {
    expect(expandStation('Oakleigh Station')).to.equal('Oakleigh Railway Station')
  })
})

describe('The cleanup of Jolimont-MCG', () => {
  it('Should clean up Jolimont-MCG', () => {
    expect(cleanupMCG('Jolimont-MCG Railway Station')).to.equal('Jolimont Railway Station')
  })

  it('Should clean up Jolimont Station-MCG', () => {
    expect(cleanupMCG('Jolimont Station-MCG')).to.equal('Jolimont Station')
  })
})

describe('The stop name processer', () => {
  it('Should apply the cleanup and expansion functions', () => {
    expect(processName('St Helena SC')).to.equal('St. Helena Shopping Centre')
    expect(processName('19 High Street Rd')).to.equal('19 High Street Road')
  })
})


describe('The amendStopDirection function', () => {
  it('Should amend the direction if it appears as "Name (Direction) Rd"', () => {
    let original = 'Station (East) St'
    expect(amendStopDirection(original)).to.equal('Station St - East')
  })

  it('Should amend the direction if it appears as "Name Rd (Direction)"', () => {
    let original = 'Station St (East)'
    expect(amendStopDirection(original)).to.equal('Station St - East')
  })

  it('Should handle the word side appearing', () => {
    let original = 'Newman Cres (north side)'
    expect(amendStopDirection(original)).to.equal('Newman Cres - North')
  })

  it('Should handle the prefix Direction of Name Rd', () => {
    let original = 'east of Pechell St'
    expect(amendStopDirection(original)).to.equal('Pechell St - East')
  })
})