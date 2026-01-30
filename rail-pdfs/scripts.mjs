import path from 'path'

const resolvePaths = paths => paths.map(p => path.join(import.meta.dirname, p))

export default {
  cwd: import.meta.dirname,
  commands: [],
  supercede: []
}