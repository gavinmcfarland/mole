# Mole

Mole (short for molecular) is abstract design system generator that allows you to translate design decisions, and output them into consumable files for any platform.

It's main principles are:

- Freedom to describe and express your design decisions how you like
- Choose your own data model for structuring and ouputting design tokens
- Simple and flexible, automatic loading of templates, optional named outputs

> Mole is currently in alpha and therfore some features may be incomplete or produce some issues. If you would like to contribute please see the [contributing guidelines](./CONTRIBUTING.md).

Mole works by reading `theme` data written in either `js` or `jsonnet` which describes certain design traits or characteristics. One or more `models` are used to structure the data so it can be used by `templates` for different platforms and languages. The models and templates are then rendered and written to a file or set of files depending on your configuration.

## Configure

Configure where Mole should look for your `theme` data, what `templates` to use, what data `models` to use and where to `output` your files by modifying `mole.config.js`. See more below about referencing models and templates.

Below if a simple example that supports just one output

```js
export default {
    theme: 'theme.js',
    template: ['border', 'color', 'width', 'flex'],
    output: { file: 'styles.css' }
}
```

Below is a more complex example with named outputs and a custom data model
```js
export default {
    theme: 'theme.js',
    model: 'tokens',
    template: 'templates/',
    output: [
        { css: { file: 'styles.css' } },
        { ios: { file: 'styles.h' } },
        { android: { file: 'styles.xml' } }
    ]
}
```

## Theme

Below is trival example of theme data being defined. It can be  accessed within `models` and `templates` by referencig the corresponding property name. For example `font.size[2]` will return `22`.

```js
{
    font: {
        size: [
            16,
            19,
            22,
            26,
            30,
            35
        ]
    }
}
```

Or generate the same array using a more expressive technique using [jsonnet](https://jsonnet.org/) includeing functions from it's [standard library](https://jsonnet.org/ref/stdlib.html).

```js
{
    font: {
        size: [
            std.ceil(16 * std.pow($.number['golden ratio'], n))
            for n in std.range(0, 5)
        ]
    }
}
```

## Models and Templates

`Models` and `templates` can be used on both individual outputs and groups of outputs and they will accept, `directories`, `files`, or `named` models and templates. Normal JavaScript files with `.js` extension can be specified for `models` and `templates` or nunjuck template files with  `.njk` extension can be used for `templates`.

```js
export default {
    theme: 'theme/',
    model: ['chars', 'tokens'], // named models in an array
    template: 'templates/', // directory only (mole will lookup named outputs as sub directories and then files)
    output: [
        { css: { template: 'templates/alternative.jnk', file: 'styles.css' } }, // An alternative template
        { ios: { file: 'styles.h' } },
        { android: { file: 'styles.xml' } }
    ]
}
```
When only a directory is provided for templates, it will look for sub directory names that match a `named output`, and then files inside those sub directories who's name matches the `model` for that output. Otherwise it will look for files directly inside the directory who's name matches a `named output`.

## Create your own models and templates

An example below to add a model to include the color red

```js
mole.add('model', 'model-name', ({data}) => {
    data.color.red = "#FF00000"
    return data
})
```

An example below to add a template to read the color we just added

```js
mole.add('template', 'template-name', () => {
    return `The color red is {{color.red}}`
})
```

## Getting started

Setup your project and install mole as a dependency

```bash
mkdir my-project
cd my-project
npm install https://github.com/limitlessloop/mole.git --save-dev
```

Require using 

```js
const mole = require('mole')
```

Mole currently doesn't  include any built-in peripherals so for now you can add them dynamically using the following

```js
mole.add('model', 'modelTest', ({data}) => {
    data.red = "#FF00000" // Trivial example just for the sake of demonstration
    return data
})
```

And to add a template do the following

```js
mole.add('template', 'templateTest', () => {
    return `The color red is {{red}}` // Reference the color we just added
})
```

Then add a configuration file to the root of your project

```js
// mole.config.js
export default {
    theme: 'theme.js', // Location of your theme file (supports .js and .jsonnet) 
    model: 'modelTest', // The name of the model we just created
    template: 'templateTest', // The name of the template we just created
    output: [
        { css: { file: 'styles.css' } }, 
        { ios: { file: 'styles.h' } },
        { android: { file: 'styles.xml' } } // You can have one or more outputs
    ]
}
```

Build files using

```js
mole.build()
```

Some examples projecs to come soon.

## Development

To setup

```bash
npm install
```
To run/compile

```bash
npm run build
```

To test

```
npm run test
```

To test and watch for changes

```
npm run dev
```

