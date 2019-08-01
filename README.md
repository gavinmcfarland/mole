# Mole

The general idea of Mole is to translate abstract design decisions and output them into consumable files for any platform.

It's main principles are:

- Freedom to describe your design descions how you like
- Choose your own data model for ouputting design tokens
- Simple setup, automatic loading of templates, optional named outputs


## Configure

Configure where Mole should look for your theme data, what templates to use, what data model to use and where to output your files by modifying `mole.config.js`.

Below if a simple example that supports just one output

```js
export default {
    theme: 'index.js',
    template: ['border', 'color', 'width', 'flex'],
    output: { file: 'styles.css' }
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

Below is trival example of theme data being defined. It can be  accessed within `models` and `templates` by referencig the corresponding property name. For example `color.red` will return `#FF0000`.

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

## Models

Create your own model which templates will use when they are rendered

```js
new Model('model-name', (model) => {

    model.newProperty = 'value'

})
```

## Templates

Create templates to use with your outputs.

```js
new Template('template-name', () => {
    
    return `The colour red is {{color.red}}`
    
})
```

## How does it work?

Mole works by reading theme data written in any `json` like format which describes certain design traits or characteristics. One or more `models` then transform the data so it can be used by `templates` for different platforms and languages. The output is written to a file or set of files depending on your configuration.



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

