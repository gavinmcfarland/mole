# Mole

The general idea of this tool is to translate abstract design decisions in the form a data interchange format like `json` and output them into consumable files for any platform.

It's main principles are:

- Freedom to describe your design descions how you like
- Choose your own data model for ouputting design tokens
- Simple setup, automatic loading of templates, optional named outputs


## Configure

Configure where Mole should look for your theme data, what templates to use, what data model to use and where to output your files.

Below if a simple example that supports just one output

```js
export default {
    theme: 'index.js',
    template: ['border', 'color', 'width', 'flex'],
    output: [{ file: 'styles.css' }]
}

```

Below is a more complex example with named outputs and a custom data model
```js
export default {
    theme: 'index.js',
    model: ['chars', 'tokens'],
    template: 'templates/',
    output: [
        { css: { file: 'styles.css' } },
        { ios: { file: 'styles.h' } },
        { android: { file: 'styles.xml' } }
    ]
}
```

## Theme

Below is trival example of theme data being defined. It can be  accessed within `models` and `templates` by referencig the corrosponding property name. For example `color.red` will return `#FF0000`.

```js
export default {
  color: {
    white   : "#FFFFFF",
    black   : "#000000",
    red     : "#FF0000",
    grey    : "#F0F0F0"
  }
}
```

## How does it work?

It works by reading theme data written in any `json` like format which describes certain design traits or characteristics. One or more `models` then transform the data so it can be more easily used by `templates` for different platforms and languages. The output is written to a file or set of files depending on your configuration.



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

