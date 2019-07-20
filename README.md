# Design Token API

The purpose of this project is to allow you to abstract design decisions from any platform in a single location.

## Diary

So far I have:

-   created the folder structure
-   implemented a compiler for ES6
-   tested a simple function using template literals
-   added loop through list of plugins functionality
-   added function which will create a property definition of CSS property given a name, or create your own:
    ```js
    {
      name: 'padding',
      abbr: 'p',
      children: [
        { name: 'top', abbr: 't', parent: 'padding' },
        { name: 'right', abbr: 'r', parent: 'padding' },
        { name: 'bottom', abbr: 'b', parent: 'padding' },
        { name: 'left', abbr: 'l', parent: 'padding' }
      ]
    }
    ```
    I chose not to include the full name or abbreviation of children so they could be created on by the author, but I'm not sure this is best.
-   Made it more explicit that CSS properties are being called in. Then in the future other properties can be added, and maybe merged etc.
-   I spent a lot of time trying to find an easy way for creators to create their own data schemas from tokens however it proved quite difficult to think of how to allow this. My main idea was to create an itterator which can create a data schema step by step using the `.next()` method but I struggled to conceptulise how it would work.
-   Did a first draft of adding support for jsonnet files. Babel wasn't coppying the `.jsonnet` files across so I had to enable a flag in the CLI to copy all files. Will need to add support for checking for js, or jsonnet extensions. Also need to test imports. Ok, so `node-jsonnet` doesn't appear to support imports. Going to try `gopherjs` method next

## Todo

-   Specify where file should output (how should this work considering it should support formats/different platforms?)
-   Create an easier way to output strings
-   Test how to reference config values from self
-   Look at how to add unit tests
-   How can I change plugin so `output()` function can be used to provide string to write without having to be returned in the function. Cannot include fs.write in output() function because otherwise this will do it for each function, but it needs to be combined
-   Should CSS properties and custom properties (utility classes) be thought of the same? I'm leaning on not maybe not because some custom properties might have the same names as CSS properties? Or perhaps they can be thought of the same, but if any custom properties are the same as default CSS properties they just overide their definition? The aim perhaps is to have a definition list of all properties the user wants in their design system. Do other platforms have different propeties, and property names? Might have to make CSS properties explicit they are CSS properties.
-   Allow the ability to split up tokens into folders

## Architecture

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
   2. Remap data structure
      3. Transform values for each platform
         4. Process template for each platform
            5. Output files
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
