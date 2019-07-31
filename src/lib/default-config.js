// TODO: Need to allow user to register templates
import { Template } from './template-class.js'

let testTemplate = new Template(function() {
	return `{% for class in classes -%}
	.{{ class.value | kebabcase}} {
		{%- include "var.njk" -%}
	}
	{% endfor %}`
})

console.log(testTemplate)

export default {
	theme: 'index.js',
	model: ['chars', 'tokens'],
	template: testTemplate,
	output: { file: 'styles.css' }
}
