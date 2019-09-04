# Mole

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Discord][discord-img]][discord-url]

Mole (short for molecular) is an platform agnostic preprocessor that allows you to create your own design system framework.

It's main features are:

- Bare bones library to create your own framework
- Multiple use cases from creating your own design system, to CSS frameworks, to something else entirely
- Simple, flexible, automatic template choosing, optional named outputs

> Mole is currently in alpha and it's features are still evolving. If you'd like to contribute to it's progress please see the [contributing guidelines](./CONTRIBUTING.md) for how you can help.

## Install

Setup your project and install mole as a dependency

```bash
npm install mole --save-dev
```

Build output files using

```js
mole.build()
```

Configure `mole` using one of the following methods below.

See the [examples](https://github.com/limitlessloop/mole/tree/master/examples) for different ways of configuring your project.

## Configure

By default `mole` will look for a file called `mole.config.js` at the root of your project you can overide this by dynamically setting it using `mole.config()`.

*An example using a config file*

```js
// mole.config.js
module.exports = {
    theme: 'theme.js', // The path of your theme file (supports .js and .jsonnet) 
    model: ['model-name'], // The name or path of any models you want to use (optional)
    template: ['template-name'], // The name or path of any templates you want to use
    output: [ // You can have one or more outputs
        { css: { file: 'styles.css' } }, 
        { ios: { file: 'styles.h' } },
        { android: { file: 'styles.xml' } }
    ]
}
```

*An example of manually setting the location of the config file*

```js
mole.config(`src/mole.config.js`)
```

### Config Options

| Property   | Type                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme`    | <nobr>`{String}` (Optional)</nobr> | The location of your theme data. Mole supports `js`, and `jsonnet`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `model`    | <nobr>`{String}` (Optional)</nobr> | Can be either a `named model`, a `dir` or a path to a __js__ `file` which exports a callback. When a `dir` is used it will look for files or sub directories who's name matches a named output. An array can be used to specify multiple models.                                                                                                                                                                                                                                                                                                                                                                    |
| `template` | <nobr>`{String}`</nobr>            | Can be either a `named template`, a `dir`, or a path to a __js__ `file` which exports a function or template string, or a __njk__ `file` which contains [Nunjucks](https://mozilla.github.io/nunjucks/) template code. When a `dir` is used it will look for sub directories who's name matches a named output and then look for file names matching a top level key inside `data`. Failing this it will look for files who's name matches a named output inside the directory. Additionally you may wish to name a file `index` and that will be used instead. An array can be used to specify multiple templates. |
| `output`   | <nobr>`{Object}`</nobr>            | An object with properties specifying where and how to process the output. You can specify a different `template` or `model` for each output. Create a named output by surrounding it in a key. An array can be used to specify multiple outputs.                                                                                                                                                                                                                                                                                                                                                                    |


## Theme

A theme is a file (or set of files, coming soon) to describe different design decisions, characteristics, traits or tokens. Mole is fairly unopinionated about how you use it so you can structure your theme data how you like. In fact a theme is completely optional if you prefer.

*Below is a trivial example of a theme*

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

Theme data is accessible inside `models` and is immutable from inside them. When you create a `model` this returns an object which updates the main model and is then available to use by `templates` when they are rendered.

*Example using Jsonnet*

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

To avoid logic responsible for describing certain design characteristics being stored in models, you can can describe theme data using a more expressive method using [Jsonnet]() which includes functions from it's [standard library]().

## Models

Models allow you to structure theme data so it can be used by different templates for different platforms and languages.

When more than one model is assigned to an output the data from each model is merged together.

*To create a named model*

```js
mole.create('model', 'model-name', ({theme}) => {

    // Create a data model by modifying the theme data
    model = theme.red
    
    return model
})
```

## Templates

Templates allow you to format theme data for a specific platform or language. You can create templates by either using template strings or a function.

When multiple templates are specified the strings from each template are merged into one.

*To create a template using a function*

```js
mole.create('template', 'template-name', () => {

    // Return a template string 
    string = `\
    .font-{{modifier}} {
        font-size: {{value}};
    }`
    
    return string
})
```

*To create a template using a template string*

```js
mole.create('template', 'template-name',

    `.font-{{modifier}} {
        font-size: {{value}};
    }`
})
```
## API

| Property        | Type                     | Description                  |
| --------------- | ------------------------ | ---------------------------- |
| `mole.config()` | `{String}` or `{Object}` | Set the configuration        |
| `mole.theme()`  | `{String}` or `{Object}` | Set or update the theme data |
| `mole.create()` | `type, name, callback`   | Create a model or template   |
| `mole.build()`  |                          | Build the output files       |


## Development

To install

```bash
npm install mole --save-dev
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
[discord-url]: https://discord.gg/BDEvF8m
[discord-img]: https://img.shields.io/discord/617327499554193445
[cli-img]: https://img.shields.io/travis/limitlessloop/mole.svg
[cli-url]: https://travis-ci.org/limitlessloop/mole
[npm-img]: https://img.shields.io/npm/v/mole.svg
[npm-url]: https://www.npmjs.com/package/mole
