<p align="center"><img src="logo.png" width="240"></p>

<p align="center">
    <a href="https://www.npmjs.com/package/mole"><img src="https://img.shields.io/npm/v/mole.svg"></a>
    <a href="https://discord.gg/BDEvF8m"><img src="https://img.shields.io/discord/617327499554193445"></a>    
</p>

<hr />

Mole is a platform agnostic preprocessor that allows you to create your own design system framework. There are a lot of ways to use `mole`. Some examples include, creating your own CSS framework, managing design tokens for different platforms, or something else entirely.

## Usage

Setup your project and install `mole` as a dependency.

```bash
npm install mole --save-dev
```

Build output files using

```js
mole.build()
```

## Configuration

By default, `mole` will look for a file called `mole.config.js` at the root of your project that exports the following object.

You can override the location of the config file by using `mole.config()`.

```js
mole.config('src/mole.config.js')
```

### Options

-   **`theme: string`**

    The location of your theme data.

-   **`model?: string | string[]`**

    The value can be:

    -   A `name` of a registered model
    -   A path to a `file` or `dir` of a model

    When using a `dir`, it will search for files or sub-directories within that directory whose names match the specified output name.

-   **`template: string | string[]`**

    The value can be:

    -   A `name` of a registered template
    -   A path to a `file` or `dir` of a template

    When using a `dir`, it will search for files or sub-directories within that directory whose names match the specified output name. You can also name a file `index` to use it instead.

    A template can be a callback or a template string.

-   **`output: object | object[]`**

    An object that defines where (`file`) and how (`model`, `template`) to process the output. You can set a different `template` or `model` for each output. Name each output by using a key.

### Types

-   **`Config`**

    ```ts
    type Config {
        theme: string,
        model?: string[],
        template?: string[],
        output: Output
    }
    ```

-   **`Output`**

    ```ts
    type Output {
        name: {
            file: string
            model?: string[],
            template?: string[]
        }
    }
    ```

-   **`ModelCallback`**

    ```ts
    type ModelCallback = (theme: object, name: string, str: string) => object
    ```

    **`TemplateCallback`**

    ```ts
    type TemplateCallback = (model: object, theme: object, name: string, str: string) => object
    ```

## API

-   ### Set configuration

    `mole.config( config ): void`

    #### Parameters

    -   `config` { string | object } path to file, or object for config

-   ### Set or update theme data

    `mole.theme( string | object ): void`

    #### Parameters

    -   `data` { string | object } path to file, or object for data

-   ### Register a model or template

    `mole.register( type, name, callback ): void`

    #### Parameters

    -   `type` { string } must be `'model'` or `'template'`
    -   `name` { string } the name of the model or template
    -   `callback` { function | string } the body of the model or template

    Register a model or template for use.

-   ### Use a model or template

    `mole.use( part ): void`

    #### Parameters

    -   `part` { array } :
        -   `type` { string } must be `'template'` or `'model'`
        -   `name` { string } name of the template or model
        -   `callback` { function | string } the body of the model or template

-   ### Render an array of templates

    `mole.render(): string[]`

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
