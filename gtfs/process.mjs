import fs from 'fs/promises'
import path from 'path'
import url from 'url'
import { GTFS_CONSTANTS } from '@transportme/transportvic-utils'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const processorsDir = path.join(__dirname, 'processors')


async function createProcessor(type, database) {
  const stops = database ? database.getCollection('gtfs-stops') : null

  const processors = {}
  for (const mode of Object.keys(GTFS_CONSTANTS.GTFS_MODES)) {
    try {
      const dirPath = path.join(processorsDir, type, mode)
      const files = (await fs.readdir(dirPath)).sort()

      const modeProcessors = []
      for (const file of files) {
        const module = await import(path.join(dirPath, file))
        modeProcessors.push(module.default)
      }

      if (files.length) {
        processors[mode] = async data => {
          let currentData = data
          for (const fn of modeProcessors) {
            currentData = await fn(currentData, stops)
            if (!currentData) return null
          }
          return currentData
        }
      }
    } catch (e) {}
  }

  return processors
}

/**
 * Processes GTFS route data
 * 
 * The following alterations are applied:
 * - West Gippsland Transit routes are merged into a single 6-WGT route.
 * - V/Line Pakenham (1-vPK) is dropped from the data
 * - V/Line Apollo Bay (5-GVL) is dropped from the data
 * - White Night routes are dropped
 * - Metro Bus operators are applied
 * - Regional bus numbers are modified to remove any town names
 * 
 * @param {GTFSRoute} route Route data
 * @returns {GTFSRoute} Updated route data
 */
export async function createRouteProcessor() {
  return await createProcessor('route')
}

export async function createStopProcessor() {
  return await createProcessor('stop')
}

export async function createTripProcessor(database) {
  return await createProcessor('trip', database)
}