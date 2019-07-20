import jsonnet from '@unboundedsystems/jsonnet'
import jsConfig from '../default-config.js'
import fs from 'fs'

const myTemplate = fs
	.readFileSync(__dirname + '/../default-config.jsonnet')
	.toString()

const imports = fs.readFileSync(__dirname + '/../cocktail.jsonnet').toString()

// You only need to create one Jsonnet object and can then call eval()
// repeatedly.

const jsonnetVm = new jsonnet.Jsonnet()

const output2 = jsonnetVm.eval(imports)

console.log(output2)

const output = jsonnetVm.eval(myTemplate)

jsonnetVm.destroy()

export default output
