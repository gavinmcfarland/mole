## Example

In this example we'll demonstrate using a config file to create your own CSS framework.

First we need a theme which acts as a single source of truth for our framework.

Create 
__mole.config.js__

```js
module.exports = {
    theme: 'theme.js',
    template: [
		'width',
		'height',
		'margin',
		'padding',
        'font-size'
        // ...
	],
	output: { file: 'styles/utilities.css' }
}
```

Build output files using

```js
mole.build()
```


Configure `mole` using one of the methods below.

See the [examples](https://github.com/limitlessloop/mole/tree/master/examples) for different ways of configuring your project.
