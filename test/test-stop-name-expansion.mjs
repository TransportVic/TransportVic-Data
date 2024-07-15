import expandStopName from '../processing/expand-stop-name.mjs'
import { expect } from 'chai'

describe('The road type expansion', () => {
  describe('The expansion of St', () => {
    it('Should expand St to Street only at the end of a name', () => {
      expect(expandStopName('James St')).to.equal('James Street')
    })

    it('Should expand St if it is followed by a N or S', () => {
      expect(expandStopName('Gillies St S')).to.equal('Gillies Street South')
      expect(expandStopName('Gillies St N')).to.equal('Gillies Street North')
    })

    it('Should expand St if it is followed by a dash for a direction', () => {
      expect(expandStopName('Prince St - East')).to.equal('Prince Street - East')
    })

    it('Should change St to St. if it appears at the front of the name', () => {
      expect(expandStopName('St Peters College')).to.equal('St. Peters College')
    })

    it('Should change St to St. if there are numbers in front of it', () => {
      expect(expandStopName('286 St Helena Rd')).to.equal('286 St. Helena Road')
    })

    it('Should not re-expand St.', () => {
      expect(expandStopName('St. Ives Hotel')).to.equal('St. Ives Hotel')
    })
  })

  describe('The expansion of Ave', () => {
    it('Should expand Ave to Avenue only if there is a word in front of it', () => {
      expect(expandStopName('Albert Ave')).to.equal('Albert Avenue')
    })

    it('Should not expand Avenue again', () => {
      expect(expandStopName('The Avenue Shopping Centre')).to.equal('The Avenue Shopping Centre')
    })

    it('Should not expand Ave if it appears at the start of the name', () => {
      expect(expandStopName('Ave Maria College')).to.equal('Ave Maria College')
    })
  })

  describe('The expansion of Mt', () => {
    it('Should expand Mt to Mount', () => {
      expect(expandStopName('Mt Dandenong Road')).to.equal('Mount Dandenong Road')
    })

    it('Should expand Mt. to Mount, removing the dot', () => {
      expect(expandStopName('Mt. Dandenong Road')).to.equal('Mount Dandenong Road')
    })
  })

  describe('Place - Place Road', () => {
    it('Should remove the space next to the hyphen', () => {
      expect(expandStopName('Some Place Road - Other Place Road')).to.equal('Some Place Road-Other Place Road')
    })
  })

  describe('Deduplcation of errornous words', () => {
    it('Should deduplicate errornous Rd Rd stops', () => {
      expect(expandStopName('Smythesdale-Snake Valley Rd Rd')).to.equal('Smythesdale-Snake Valley Road')
    })

    it('Should deduplicate errornous St St stops', () => {
      expect(expandStopName('High St St')).to.equal('High Street')
    })

    it('Should not deduplicate Some St Sth', () => {
      expect(expandStopName('Ward St Sth')).to.equal('Ward Street South')
    })
  })
})