# Basic example

## Quickstart

This example was created with [Mole](https://github.com/gavinmcfarland/mole). It shows how you can use Mole to create utility classes for use with a design system.

### Requirements

-   [Node.js](https://nodejs.org/en)

### Try me

1. Copy this folder using [degit](https://github.com/Rich-Harris/degit).

    ```shell
    npx degit mole/examples/basic mole-basic-example
    ```

2. Change directory and install the dependencies.

    ```shell
    cd mole-basic-example
    npm install
    ```

3. Try it out by creating a build.

    ```shell
    npm run build
    ```

### How it works

Mole looks for a `mole.config.js` file to decide where to find the `theme`, `models` and `templates`.

```js
export default {
    theme: 'theme.js',
    template: ['src/templates/'],
    output: {
        file: 'build/style.css',
    },
}
```

In this example, Mole passes the data from the `theme` to all the templates listed inside `src/templates/` and outputs a file called `styles.css`.

### Setup from scratch

To create this from scratch we need to:

1. Install mole as a dependency
2. Create a `theme.js` file
3. Create a `mole.config.js` file
4. Import mole to your project
5. Build your files using `mole.build()`

### Advanced

See [Mole](https://github.com/gavinmcfarland/mole) for further options.
