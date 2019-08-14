# mole *0.0.1*



### src/lib/Config.js


#### new Config() 

Provides config settings for main application to use

```js
// mole.config.js
export default {
	theme: 'theme/',
	model: ['chars', 'tokens'],
	template: 'templates/',
	output: [
		{ css: { file: 'styles.css' } },
		{ ios: { file: 'styles.h' } },
		{ android: { file: 'styles.xml' } }
	]
}
```






##### Examples

```javascript
{
	theme: 'theme/',
	model: [ 'model-name' ],
	template: [ 'templates/' ],
	output: [
		{ css: { file: 'styles.css' } },
		{ ios: { file: 'styles.h' } },
		{ android: { file: 'styles.xml' } }
	]
}
```


##### Returns


- `Void`



#### normaliseConfig(config) 

Normalises user's config for easier use.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| config | `Object`  | The properties for the config | &nbsp; |




##### Returns


- `Void`



#### putValuesIntoArray(value) 

Checks if value is an array and if not creates an array




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `String` `Array`  | The value to check if an array | &nbsp; |




##### Returns


- `Void`




### src/lib/Model.js


#### new Model(name, func) 

Creates a new user defined model




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | Name of the model | &nbsp; |
| func |  | A callback that returns an object for the model | &nbsp; |




##### Examples

```javascript
// Example using `add()` method
mole.add(
	new Model('model-name', function(data) {
		return // The object you'd like to return which sets the data model
	})
)
```


##### Returns


- `[object Object]`  An object with a `name`, a `func`, and an optional `output` property



#### this.name(data, theme) 

Callback for returning a data model




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `object`  | - Access to the data model | &nbsp; |
| theme | `object`  | - Access the original theme data | &nbsp; |




##### Returns


- `object`  An object which replaces or adds to the existing `data` model




### src/lib/Mole.js


#### new Mole() 

Create a new instance of the main application

```js
import * from 'mole'

mole.add(
	new Model('model-name', ({data}) => {
		data.hello = "hello"
		return data
	})
)

mole.build()
```






##### Returns


- `Void`



#### Mole.render(outputs) 

Renders the `templates` and `models` of the outputs




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| outputs | `Object`  | Outputs with string and data to render | &nbsp; |




##### Returns


-  Returns an array of objects with contents and paths



#### Mole.build() 

Builds the files from the outputs




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
|  | `Object`  |  | &nbsp; |




##### Examples

```javascript
// Example output
build/
	css/
		styles.css
	ios/
		styles.h
	android/
		styles.xml
```


##### Returns


-  



#### Mole.add(peripheral) 

Adds a new `model` or `template` to list of peripherals




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| peripheral | `Mole.Model` `Mole.Template`  | Either an instance of a `Model` or a `Template` | &nbsp; |




##### Examples

```javascript
// Adding a template dynamically to a named output of `css`
mole.add(
	new Template('template-name', ({data, theme}) => {
		return '// return string'
	}
)
```


##### Returns


-  




### src/lib/Output.js


#### new Output() 

Creates an output which is then consumable by `mole.build()`
```js
{
	output: [
		{
			name: 'css',
			template: 'The color red is {{color.red}}',
			model: {
				token: {
					name: 'colorRed',
					value: '#FF0000'
				}
			},
			path: 'output/file.css'
		}
	]
}
```





##### Properties

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |



##### Returns


- `Void`



#### getContent(output, peripherals)  *private method*

Gets the content from plugin, directory or file




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| output | `Object`  | An individual output | &nbsp; |
| peripherals | `Object`  | A List of peripherals which contain `models` and/or `templates` | &nbsp; |




##### Returns


- `String` `Object`  Returns either an object for a `model` or an string for a `template`




### src/lib/Data.js


#### new Data() 

Creates a clone of the `theme` data which can be manipulated and structured by `models`.






##### Returns


- `Void`




### src/lib/Outputs.js


#### new Outputs() 

Creates a array of outputs which contain contents of `models` and `templates`

```js
outputs: [
  Output {
	  name: 'css',
	  model: {
				token: {
					name: 'colorRed',
					value: '#FF0000'
				}
			}
	  template: 'The color red is {{color.red}}',
   path: 'styles.css'
  } //...
]
```






##### Returns


- `Void`



#### normaliseOutputs(outputs) 

Flattens the structure of user defined output so it's easier to work with
```js
{
	output: [
		{
			template: ['template-name'],
			model: ['tokens', 'mixins'].
			dir: 'templates/',
			file: 'style.css',
			path: 'templates/style.css'
		}
	]
}
```




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| outputs | `Object`  | A config with property called output which contains an array | &nbsp; |




##### Returns


- `Void`




### src/lib/Peripherals.js


#### new Peripherals() 

Creates a list of Peripherals which contain `models` and/or `templates`
```js
{
	models: [
		{ name: 'model-name', data: '' }
	],
	templates: [
		{ name: 'template-name', string: '' }
	]
}
```





##### Properties

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |



##### Returns


- `Void`




### src/lib/Template.js


#### new Template(name, func) 

Creates a new user defined template




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | Name of the template | &nbsp; |
| func |  | A callback that returns a string for the template | &nbsp; |




##### Examples

```javascript
// Example while exporting as module
import Template from 'mole'

export default new Template('template-name', function(model) {
		return // The string you'd like to return to be parsed
	})
)
```


##### Returns


- `[object Object]`  An object with a `name`, a `func`, and an optional `output` property



#### this.name(data, theme) 

Callback for returning a template string




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | - Access to the data model | &nbsp; |
| theme | `Object`  | - Access the original theme data | &nbsp; |




##### Returns


- `String`  Returns a string which is rendered using a templating engine




### src/lib/Theme.js


#### new Theme() 

Theme data used by templates with outputs
```js
// theme/index.js
export default {
	font: {
		size: [ 16, 19, 22, 26, 30, 35 ]
	}
}
```






##### Returns


- `Object`  Returns an object which is used by {@link Mole.Data}



#### Theme.clone() 

Keeps an original copy of the theme data in case it needs to be referenced by the user






##### Returns


- `Void`



#### Theme.parse() 

Parses the given theme data so it's usable by the rest of the app






##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
