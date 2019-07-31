import getOutputs from './lib/get-outputs.js'
import fs from 'fs-extra'
import glob from 'glob'
import generateContents from './lib/generate-contents.js'

const outputs = getOutputs()
console.log(outputs)
