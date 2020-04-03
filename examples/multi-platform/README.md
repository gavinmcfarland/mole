## Setting up a project for multiple platforms

Setup your project and install mole as a dependency

```bash
mkdir my-project
cd my-project
npm install mole --save-dev
```

Require using 

```js
const mole = require('mole')
```

Create a folder where you can reference templates

```bash
mkdir templates
mkdir android css ios
```

Which will give you a structure like the following

```bash
templates/
    android/
    css/
    ios/
```

Configure Mole to know where to look for the templates. By providing just the directory name Mole will looking for sub directories that match the named outputs. It will then look for file names matching any top level key inside `data`, which is a copy of your theme data which has been modified using a model. Failing that it will look for any files named `index`.

```js
module.exports = {
    theme: 'theme/',
    model: 'chars',
    template: 'templates/',
    dir: 'build/',
    output: [
        { android: { file: 'file.xml' } },
        { css: { file: 'file.css' } },
        { ios: { file: 'file.ios' } },
    ]
}
```

Below is an example of what our data might look like

```js
{
    tokens: [
        {
            name: 'colorRed',
            value: '#FF000'
        },
        {
            name: 'colorGreen',
            value: '#008000'
        },
        {
            name: 'colorBlue',
            value: '#0000CD'
        }
    ]
}
```

Mole will look for files inside `templates/android|css|ios/tokens|index.njk`

Build the outputs using

```js
mole.build()
```



