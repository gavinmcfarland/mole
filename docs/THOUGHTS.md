# Architecture

### Tokens

A `token` is an abstract term for any configuration which can affect appearance and or behaviour. Depending on the purpose of the token it can be used to control different aspects appearance or behaviour and can be consumed in a variety of ways, depending on how it's handled by plugins.

An example of a token is `theme.color.primary = "FF0000"`.

### Theme

A Theme is a collection of tokens. A theme contains all the design tokens for a product like, spacing, fonts, colours, styles, assets etc. This is then transformed by a set of plugins into a `part` for each platform which is consumable by the product either directly, inside components or used to make new parts. Because themes are a collection of tokens they can be organised and names how you wish. If needed they can be grouped into folders.

### Parts

Parts are used to control the variation and consistency of visual outputs. Parts are indirect outputs of tokens, they contain certain design choices for a given product. Parts can contain any number of rules, declarations, properties and values and therefore can responsible for simple or complex styles. It's because of their flattened nature that it's possible to simplify the process of configuring a components style properties.

## How it works

The plugin is what handles a `part`. A part is what controls the way a `token` is interpreted, formatted and outputted for each platform. You can choose where to output the code from the plugin, or from a global setting. A part plugin reads one or more tokens and using a template outputs the code to a given file. One of the challenges is that if the template is defined inside the plugin, then it makes it difficult keep it DRY because each platform will have a certain way of formatting code, which should a template should be created for. One idea for this is to build a templating language for this, however for now maybe something can be achived with a templating language that exists already.

Perhaps a part plugin can be fed a language like `css` and a type like, `var` or `class` and some data like an object which follows a speficic format. Below are some ideas/improvisations

```hbs
{
  "color-primary" {
    "color": "red"
  }
}

.{{@}} {                                         #if type is "class"
  {{@}}: {{@value}}
}
```

## Order of Things

```
1. Input token data
   1. Remap data structure
      1. Transform values for each platform
         1. Process template for each platform
            1. Output files
```

## Custom templating language

Below is an idea for a custom templating language aimed at reducing markup clutter. It works by itterating over an object and going into each level and back up again. A `{{@}}` is a representation of the current property being itterated and will also output the name of the current property by default. `>>` indicates that it should go down a level of the object. `<<` Will tell it to go back to the start of the current property. It needs a bit more thought, but I think there is an idea there.

```hbs
// css/class.template
.{{@}} {                                         #if type is "class"
  {{import decl}}
  {{import class}}
  {{import atRule}}
}

// css/atRule.template
@{{type}} {{@}} {                                #if type is "atRule"
  {{import decl}}
  {{import class}}
  {{import atRule}}
}

// css/decl.template
{{@}}: {{@value}}                                #if type is "decl"

// css/var.template
:root {                                          #if type is "var"
  --{{@}}: >>{{@}},<<;
}
```

## Todo

```js
;[
	{
		value: 'light',
		type: 'class',
		children: [
			{
				value: 'color',
				type: 'var',
				children: [
					{
						value: 'red',
						type: 'value'
					}
				]
			},
			{
				value: 'backgroundColor',
				type: 'var',
				children: [
					{
						value: 'blue',
						type: 'value'
					}
				]
			},
			{
				value: 'headingColor',
				type: 'var',
				children: [
					{
						value: 'blue',
						type: 'value'
					}
				]
			},
			{
				value: 'linkColor',
				type: 'var',
				children: [
					{
						value: 'blue',
						type: 'value'
					}
				]
			}
		]
	},
	{
		value: 'dark',
		type: 'class',
		children: [
			{
				value: 'color',
				type: 'var',
				children: [
					{
						value: 'green',
						type: 'value'
					}
				]
			},
			{
				value: 'backgroundColor',
				type: 'var',
				children: [
					{
						value: 'pink',
						type: 'value'
					}
				]
			},
			{
				value: 'headingColor',
				type: 'var',
				children: [
					{
						value: 'blue',
						type: 'value'
					}
				]
			},
			{
				value: 'linkColor',
				type: 'var',
				children: [
					{
						value: 'blue',
						type: 'value'
					}
				]
			}
		]
	}
]
```

## Ideas

-   `type` examples: value, class
-   `config` examples `config: {format: "css"}`
-   `theme` examples `theme: {color: {primary: "red"}}`

## API ideas

-   `ouput()` helps output code to a string
-   `value()` transforms the ouput of a value

## Usage

To use this project first install the dependencies

```bash
npm install
```

Then run the application to test it

```bash
npm start
```
