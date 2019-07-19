# Outputing for different formats

Perhaps a part plugin can be fed a language like `css` and a type like, `var` or `class` and some data like an object which follows a speficic format. Below are some ideas/improvisations

## Using custom templating language

```js
// plugins/custom-plugin.js

const data = {
	'color-primary': {
		color: 'red'
	}
}

output('css', 'class', data)
```

```hbs
<!-- template/css/class.template -->
.{{@}} {
    {{@}}: {{@value}}
}
```

## Same idea using existing templating language

```js
// plugins/custom-plugin.js

const data = {
	'color-primary': {
		color: 'red'
	},
	'color-secondary': {
		color: 'black'
	}
}

output('css', 'class', data)
```

```hbs
<!-- template/css/class.template -->
{{#each class}}
.{{@key}} {
    {{#each this}}
    {{@key}}: {{this}}
    {{/each}}
}
{{/each }}
```

## Another idea

```js
// plugins/custom-plugin.js

// Something that converts data to the following way

const data = {
	lang: 'css',
	data: [
		{
			type: 'class',
			value: 'color-primary',
			children: [
				{
					value: 'color',
					type: 'prop',
					children: [
						{
							value: 'red',
							type: 'value'
						}
					]
				},
				{
					value: 'background-color',
					type: 'prop',
					children: [
						{
							value: 'black',
							type: 'value'
						}
					]
				}
			]
		},
		{
			type: 'class',
			value: 'color-secondary',
			children: [
				{
					value: 'color',
					type: 'prop',
					children: [
						{
							value: 'red',
							type: 'value'
						}
					]
				},
				{
					value: 'background-color',
					type: 'prop',
					children: [
						{
							value: 'black',
							type: 'value'
						}
					]
				}
			]
		}
	]
}

output(data)

// Can it work intelligently, if object provided then parse it, if string provided then follow standard way of outputing.
```

```hbs
<!-- template/css/class.template -->
{{#each class}}
.{{@key}} {
    {{> myPartial }}
}
{{/each }}
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

## Using handlebars for data structure

```hbs
{{#each token}}
    {
        value: 'light',
        type: 'class',
        children: [
            {{#each child}}
            {
                value: 'color',
                type: 'var',
                children: [
                    {{#each child}}
                    {
                        value: 'red',
                        type: 'value'
                    }
                    {{/each}}
                ]
            }
        {{/}}
    }
{{/each}}
```
