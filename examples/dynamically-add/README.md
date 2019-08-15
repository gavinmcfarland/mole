## Adding models and templates dynamically

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

Add models and templates using the following format

```js
mole.add('model', 'modelTest', ({data}) => {
    data.red = "#FF00000" // Trivial example just for the sake of demonstrating
    return data
})
```

Then add a configuration file to the root of your project

```js
// mole.config.js
module.exports = {
    theme: 'theme.js', // Location of your theme file (supports .js and .jsonnet) 
    model: 'modelTest', // The name of any models your added
    template: 'templateTest', // The name of the template we just added
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
