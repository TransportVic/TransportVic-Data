import { DOMParser } from '@xmldom/xmldom'
import fs from 'fs/promises'
import fetch from 'node-fetch'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const calendarDir = path.join(__dirname, '..', 'calendar', 'vic-public-holidays')

const ICAL_URL_BASE = 'https://www.vic.gov.au/'
const ICAL_URL_PATH = '/ical'

const webpage = await (await fetch(new URL(ICAL_URL_PATH, ICAL_URL_BASE))).text()

const dom = new DOMParser().parseFromString(webpage)
const anchorTags = dom.documentElement.getElementsByTagName('a')
const holidayLink = Array.from(anchorTags).find(tag => tag.textContent.includes('public holiday'))

const linkPath = holidayLink.getAttribute('href')

const fullPath = new URL(linkPath, ICAL_URL_BASE)

const icalData = await (await fetch(fullPath)).text()
await fs.writeFile(path.join(calendarDir, 'vic-holidays.ics'), icalData)

const now = new Date()

const matchedDates = icalData
  .match(/DTEND;VALUE=DATE:(\d+)/g)
  .map(d => d.match(/DTEND;VALUE=DATE:(\d+)/)[1])
  .sort()

await fs.writeFile(path.join(calendarDir, 'note.txt'), `Data is sourced from https://www.vic.gov.au/ical
Last updated: ${now.getMonth() + 1}/${now.getFullYear()}
Data extent: ${matchedDates[matchedDates.length - 1]}`)

process.exit(0)