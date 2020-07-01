<p align="center"><img src="logo.png" width="240"></p>

<p align="center">
    <a href="https://www.npmjs.com/package/mole"><img src="https://img.shields.io/npm/v/mole.svg"></a>
    <a href="https://travis-ci.org/limitlessloop/mole"><img src="https://img.shields.io/travis/limitlessloop/mole.svg"></a>
    <a href="https://discord.gg/BDEvF8m"><img src="https://img.shields.io/discord/617327499554193445"></a>    
</p>

<hr />

Mole is a platform agnostic preprocessor that allows you to create your own design system framework. There are a lot of ways to use `mole`. Some examples include, creating your own CSS framework, managing design tokens for different platforms, or something else entirely.

- [Configuration](#configuration)
- [Themes](#themes)
- [Models](#models)
- [Templates](#templates)
- [API](#api)
- [Installation](#installation)
- [Development](#development)

## Usage

Setup your project and install `mole` as a dependency.

```bash
npm install mole --save-dev
```

Build output files using

```js
mole.build()
```

Configure `mole` using one of the methods below.

See the [examples](https://github.com/limitlessloop/mole/tree/master/examples) for different ways of configuring your project.

## Configuration

By default `mole` will look for a file called `mole.config.js` at the root of your project.

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

You can override the location of the config file by using `mole.config()`.

```js
mole.config('src/mole.config.js')
```

#### Properties

- __`theme` optional__

    The location of your theme data. Mole supports `js`, and `jsonnet`.

    __Type__: String

---

- __`model` optional__

    Can be either a:
    
    - `named model`,
    - `dir`
    - `path` to a __js__ file which exports a callback.
    
    When a `dir` is used it will look for files or sub directories who's name matches a named output. An array can be used to specify multiple models.

    __Type__: String

---

- __`template`__
    
    Can be either a:
    
    - `named template`
    - `dir`
    - `path` to a __js__ file which exports a callback or template string, or a __njk__ `file` which contains [Nunjucks](https://mozilla.github.io/nunjucks/) template code.
    
    When a `dir` is used it will look for sub directories who's name matches a named output and then look for file names matching a top level key inside `data`. Failing this it will look for files who's name matches a named output inside the directory. Additionally you may wish to name a file `index` and that will be used instead. An array can be used to specify multiple templates.

    __Type__: String

---

- __`output`__

    A object with properties specifying where (`file`) and how to process(`model`, `template`) the output. You can specify a different `template` or `model` for each output. Create a named output by surrounding it in a key. An array can be used to specify multiple outputs.

    ```js
    {
        file: '', // File and directory to output the file
        model: '', // Model to use (optional)
        template: '' // Template(s) to use (optional)
    }
    ```

    __Type__: Object | Array


## Themes

A theme is a file used to describe different design decisions, characteristics, traits or tokens. Mole is fairly unopinionated about how you use it so you can structure your theme data how you like. In fact a theme is completely optional if you prefer.

__Below is a trivial example of a theme__

```js
{
    font: {
        size: [ 16, 19, 22, 26, 30, 35 ]
    }
}
```

Theme data is accessible inside `models` and is immutable from inside them. When you create a `model` this returns an object which updates the main model and is then available to use by `templates` when they are rendered.

To avoid logic responsible for describing certain design characteristics being stored in models, you can can describe theme data using a more expressive method using [Jsonnet]() which includes functions from it's [standard library]().

__Example using Jsonnet__

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

## Models

Models act like middleware which allow you to create a data structure separate from theme data so it can be used by different templates for different platforms and languages.

When more than one model is assigned to an output the data from each model is merged together.

__To use a named model__

```js
mole.use('model', 'model-name', (theme, name, str) => {

    // Do something here to modifying the theme data
    theme.newProperty = []
    
    return theme
})
```

## Templates

Templates allow you to format data for a specific platform or language. You can create templates by either using template strings (using [Nunjucks](https://mozilla.github.io/nunjucks/)) or a function.

When multiple templates are specified the strings from each template are merged into one.

__An example of using a function__

```js
mole.use('template', 'font-size', (model, theme, name, str) => {

    let scale = model[name]

    for (let i = 0; i < scale.length; i++) {

        str`
            .$font-${i} {
                font-size: ${scale[i]}
            }`
    }
    
    return str()
})
```

__An example of using a template string__

```js
mole.use('template', 'font-size',

    `.font-{{modifier}} {
        font-size: {{value}};
    }`
})
```

## API


- __`mole.config( path | object )`__ String | Object

    Set the configuration.

- __`mole.theme( path | object )`__ String | Object

    Set or update the theme data.

- __`mole.register( model | template, name, callback )`__ String, String, Function

    Register a model or template for use.

- __`mole.use( [ model | template, ] [ name ] [, callback] )`__ String, String, Function

    Use a model or template directory, or use one that has been registered.

- __`mole.render()`__

    Returns an array of rendered templates.

- __`mole.build()`__

    Builds the output files.


## Installation

Setup your project and install `mole` as a dependency.

```bash
npm install mole --save-dev
```

## Development

To install

```bash
npm install mole@next --save-dev
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
