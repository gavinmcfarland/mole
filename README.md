<p align="center"><img src="logo.png" width="240"></p>

<p align="center">
    <a href="https://www.npmjs.com/package/mole"><img src="https://img.shields.io/npm/v/mole.svg"></a>
    <a href="https://travis-ci.org/limitlessloop/mole"><img src="https://img.shields.io/travis/limitlessloop/mole.svg"></a>
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

By default `mole` will look for a file called `mole.config.js` at the root of your project.

```js
// mole.config.js
export default {
	theme: 'theme.js',
	model: ['model-name'],
	template: ['template-name'],
	output: [{ css: { file: 'styles.css' } }, { ios: { file: 'styles.h' } }, { android: { file: 'styles.xml' } }],
}
```

You can override the location of the config file by using `mole.config()`.

```js
mole.config('src/mole.config.js')
```

### Options

-   `theme?: string`

    The location of your theme data.

---

-   **`model?: string | string[]`**

    The value can be:

    -   A `name` of a registered model
    -   A path to a `file` or `dir` of a model

    When using a `dir`, it will search for files or sub-directories within that directory whose names match the specified output name.

---

-   `template: string | string[] | Name | Path`

    `Path` to a **js** file which exports a callback or template string, or a **njk** `file` which contains [Nunjucks](https://mozilla.github.io/nunjucks/) template code.

    When a directory is used it will look for sub-directories whose name matches a named output and then look for file names matching a top-level key inside `data`. Failing this it will look for files whose name matches a named output inside the directory. Additionally, you may wish to name a file `index` and that will be used instead. An array can be used to specify multiple templates.

---

-   `output: object | object[]`

    An object with properties specifying where (`file`) and how to process(`model`, `template`) the output. You can specify a different `template` or `model` for each output. Create a named output by surrounding it in a key. An array can be used to specify multiple outputs.

    ```ts
    {
        file: '', // Where to output the file
        model?: '', // Model(s)
        template?: '' // Template(s)
    }
    ```

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
