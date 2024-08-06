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

```ts
type Config {
	theme: 'theme.js',
	model?: ['model-name'],
	template?: ['template-name'],
	output: [
        { css: { file: 'styles.css' } },
        { ios: { file: 'styles.h' } },
        { android: { file: 'styles.xml' } }
    ],
}
```

You can override the location of the config file by using `mole.config()`.

```js
mole.config('src/mole.config.js')
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
    type Output {
        file: '', // Where to output the file
        model?: '', // Model(s)
        template?: '' // Template(s)
    }
    ```

## API

-   **`mole.config( string | object ): void`**

    Set the configuration.

-   **`mole.theme( string | object ): void`**

    Set or update the theme data.

-   **`mole.register( model: string | template: string, name: string, callback?: function ): void`**

    Register a model or template for use.

-   **`mole.use( model: string | template: string, name, callback? ): void`**

    Use a model or template directory, or use one that has been registered.

-   **`mole.render(): string[]`**

    Returns an array of rendered templates.

-   **`mole.build()`**

    Builds the output files.

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
