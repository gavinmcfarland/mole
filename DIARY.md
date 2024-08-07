# 2024.08.01

Only two options that worked for bundling to support dynamic imports were:

a) bunlding using esbuild with shim for fs-events
b) not bundling, and using typescript

Every other method of bundling ran into problems.

The issue is, this project relies on dynamic imports in the user root directory. These are files such as `mole.config.js`. When bundling the library and then running it, it gives an error saying "dymanic imports are not supported".

# 2024.07.07

The latest I've found that works is using Rollup. In my setup it creates two bundles, one for cjs and one for es modules. However one of the issues is that because the package itself is an ES module, the package it's being used in must be an ES module as well unless I change the extension of all the files in the bundle to use `.cjs`. For now I've create a rollup plugin that renames all the files in the output. This seems to work now when consuming the library using either as Common JS or ES Module.
