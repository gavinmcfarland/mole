# Mole

## Issue

Trouble preparing the library for distribution.

Options are:

-   a) bundle the library
-   b) not bundle it but just transform and minify it

The issue is, this project relies on dynamic imports in the user root directory. When bundling the library and then running it, it gives an error saying "dymanic imports are not supported".

I feel like this should still be possible as some es2018 supports dynamic imports.

Failing this the other option is not to bundle the library. However the issue I've had with this is when I set the output to a directory, all the files are relative and point to the wrong directory.

For example:

```js
// esm/index.js
import mole from './lib/Mole.js'
// console.log(mole.debug)
export default mole
//# sourceMappingURL=index.js.map
```

This above is the outputed file using the typescript compiler. But because its in a different file to the `src` directory, all the imported files point to the wrong location.

## How to use this repo

It's configured with two compilers, `esbuild` and `typescript`. I can't seem to get either of them to work.

1. First, create a build

```shell
npm run build:es
```

2. Then test the build works

```shell
npm run test:es
```

To do this with `typescript` just change it to `:ts`.
