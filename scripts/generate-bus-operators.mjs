import readXLSXFile from 'read-excel-file/node'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const operatorsDir = path.join(__dirname, '..', 'excel', 'bus', 'operators')

async function readSheet(sheet) {
  const stream = createReadStream(path.join(operatorsDir, 'Bus Operators.xlsm'))
  const rows = await readXLSXFile(stream, { sheet })

  return rows
}

const metroOperators = await readSheet('Metro')
const numberedRegionalOperators = await readSheet('Regional - Numbered')
const interTownOperators = await readSheet('Regional - Inter Town Link')
const operatorDetails = await readSheet('Operator Details')

const metroOutput = metroOperators.slice(1).reduce((acc, row) => {
  acc[row[0]] = [row[1]]
  if (!!row[2]) acc[row[0]].push(row[2])
  return acc
}, {})

const regionalNumberedOutput = numberedRegionalOperators.slice(1).reduce((acc, row) => {
  const [region, route, operator] = row
  if (!acc[region]) acc[region] = {}
  acc[region][route] = operator
  
  return acc
}, {})

const routeNameIndex = interTownOperators[0].indexOf('Route Name')
const operatorIndex = interTownOperators[0].indexOf('Operator')
const interTownOutput = interTownOperators.slice(1).reduce((acc, row) => {
  const routeName = row[routeNameIndex]
  const operator = row[operatorIndex]

  acc[routeName] = operator
  return acc
}, {})

const oddColourIndex = operatorDetails[0].indexOf('Colour (Odd)')
const evenColourIndex = operatorDetails[0].indexOf('Colour (Even)')
const textColourIndex = operatorDetails[0].indexOf('Text Colour')
const defaultOdd = 'd7832c', defaultEven = 'c47625', defaultText = '1e1e1e'
const operatorColours = operatorDetails.slice(2).reduce((acc, row) => {
  const operator = row[0]
  const oddColour = row[oddColourIndex] || defaultOdd
  const evenColour = row[evenColourIndex] || defaultEven
  const textColour = oddColour === defaultOdd ? defaultText : row[textColourIndex]

  const simpleOperatorName = operator.replace(/[^\w]/g, '-').replace(/--+/g, '-').replace(/-$/, '').toLowerCase()

  const css = `.${simpleOperatorName} {
  --operator-odd: #${oddColour};
  --operator-even: #${evenColour};
  --operator-text: #${textColour};
}`

  acc.push(css)

  return acc
}, []).join('\n')


await writeFile(path.join(operatorsDir, 'metro-operators.json'), JSON.stringify(metroOutput, null, 1))
await writeFile(path.join(operatorsDir, 'regional-numbered-operators.json'), JSON.stringify(regionalNumberedOutput, null, 1))
await writeFile(path.join(operatorsDir, 'regional-inter-town-operators.json'), JSON.stringify(interTownOutput, null, 1))
await writeFile(path.join(operatorsDir, 'bus-operators.css'), operatorColours)
