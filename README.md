<p align="center"><img src="logo.png" width="240"></p>

<p align="center">
    <a href="https://www.npmjs.com/package/mole"><img src="https://img.shields.io/npm/v/mole.svg"></a>
    <a href="https://discord.gg/BDEvF8m"><img src="https://img.shields.io/discord/617327499554193445"></a>    
</p>

<hr />

Mole is a platform-agnostic preprocessor that allows you to create molecular inputs for your design system. There are a lot of ways to use `mole`. Some examples include: creating your own CSS utilities framework, managing design tokens for different platforms, or something else entirely.

-   [Usage](#usage)
-   [Configuration](#configuration)
-   [Themes](#themes)
-   [Models](#models)
-   [Templates](#templates)
-   [API](#api)
-   [Development](#development)

## Usage

1. Setup your project and install `mole` as a dependency.

    ```bash
    npm install mole --save-dev
    ```

2. Add a `mole.config.js` file to the root of your project.

3. Build output files using

    ```js
    mole.build()
    ```

## Configuration

By default, `mole` will look for a file called `mole.config.js` at the root of your project that exports the following object.

```ts
interface Config {
    theme: string
    model?: string[]
    template?: string[]
    output: Output
}
```

### Options

-   **`theme: string`**

    The location of your theme data.

---

-   **`model?: string | string[]`**

    The value can be:

    -   A `name` of a registered model
    -   A path to a `file` or `dir` of a model

    When using a `dir`, it will search for files or sub-directories within that directory whose names match the specified output name.

---

-   **`template: string | string[]`**

    The value can be:

    -   A `name` of a registered template
    -   A path to a `file` or `dir` of a template

    When using a `dir`, it will search for files or sub-directories within that directory whose names match the specified output name. You can also name a file `index` to use it instead.

    A template can be a callback or a template string.

---

-   **`output: object | object[]`**

    An object that defines where (`file`) and how (`model`, `template`) to process the output. You can set a different `template` or `model` for each output. Name each output by using a key.

    ```ts
    interface Output {
        name: {
            file: string
            model?: string[]
            template?: string[]
        }
    }
    ```

## Themes

A theme is a file used to describe different design decisions, characteristics, traits or tokens. Mole is fairly unopinionated about how you use it so you can structure your theme data how you like. A theme is completely optional if you prefer.

Theme data is accessible inside `models` and is immutable from inside them. When you create a `model` this returns an object which updates the main model and is then available to use by `templates` when they are rendered.

To avoid logic responsible for describing certain design characteristics being stored in models, you can describe theme data using a more expressive method using [Jsonnet]() which includes functions from its [standard library]().

## Models

Models act like middleware which allows you to create a data structure separate from theme data so it can be used by different templates for different platforms and languages.

When more than one model is assigned to an output the data from each model is merged.

## Templates

Templates allow you to format data for a specific platform or language. You can create templates by either using template strings (using [Nunjucks](https://mozilla.github.io/nunjucks/)) or a function.

When multiple templates are specified the strings from each template are merged into one.

## API

-   ### Set configuration

    `mole.config( config ): void`

    #### Parameters

    -   `config` { string | object } path to file, or object for config

    #### Example

    ```js
    mole.config('src/mole.config.js')
    ```

---

-   ### Set or update theme data

    `mole.theme( data ): void`

    #### Parameters

    -   `data` { string | object } path to file, or object for data

---

-   ### Register a model or template

    `mole.register( type, name, callback ): void`

    #### Parameters

    -   `type` { string } must be `'model'` or `'template'`
    -   `name` { string } the name of the model or template
    -   `callback` { function | string } the body of the model or template

    Register a model or template for use.

---

-   ### Use a model or template that's been registered

    `mole.use(type, name, callback): void`

    #### Parameters

    -   `type` { string } must be `'template'` or `'model'`
    -   `name` { string } name of the template or model
    -   `callback` { function | string } the body of the model or template

    #### Example

    Using a function:

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

    Using a string:

    ```js
    mole.use('template', 'font-size',

    	`.font-{{modifier}} {
    		font-size: {{value}};
    	}`
    })
    ```

---

-   ### Render an array of templates

    `mole.render(): Promise<object[]>`

---

-   ### Build the output files

    `mole.build()`

## Development

To create a build to distribute

```shell
npm run build
```

To test the distribution

```shell
npm run test:dist
```

To test

```shell
npm run test
```
