# Basic setup

Try this repo.

1. Copy this folder using [degit](https://github.com/Rich-Harris/degit).

    ```shell
    npx degit mole/examples/basic mole-basic-example
    cd mole-basic-example
    ```

2. Install the dependencies.

    ```shell
    npm install
    ```

3. Try it out by creating a build.

    ```shell
    npm run build
    ```

## Setting up from scratch

Install mole as a dependency.

```bash
npm install mole@next --save-dev
```

Add mole to your project.

```js
import mole from 'mole'
```

Define your `theme.js` file.

```js
export default {
    color: {
        green: '#FF7189',
        navy: '#001F3F',
        blue: '#0074D9',
        aqua: '#7FDBFF',
        teal: '#39CCCC',
        olive: '#3D9970',
        // ....
    },
}
```

Add a configuration file to the root of your project.

```js
// mole.config.js
export default {
    theme: 'theme.js',
    template: ['templates/color.js'],
    output: { file: 'build/file.css' },
}
```

Build files using

```js
mole.build()
```
