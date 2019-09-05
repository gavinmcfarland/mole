## Todo

-   Specify where file should output (how should this work considering it should support formats/different platforms?)
-   Create an easier way to output strings
-   Test how to reference config values from self
-   Look at how to add unit tests
-   How can I change plugin so `output()` function can be used to provide string to write without having to be returned in the function. Cannot include fs.write in output() function because otherwise this will do it for each function, but it needs to be combined
-   Should CSS properties and custom properties (utility classes) be thought of the same? I'm leaning on not maybe not because some custom properties might have the same names as CSS properties? Or perhaps they can be thought of the same, but if any custom properties are the same as default CSS properties they just override their definition? The aim perhaps is to have a definition list of all properties the user wants in their design system. Do other platforms have different properties, and property names? Might have to make CSS properties explicit they are CSS properties.
-   Allow the ability to split up tokens into folders
-   This [data templating language](https://jsonnet.org/) should be used for the tokens and property outlines
-   Make `theme` immutable
-   Change callback function of peripherals so that they arguments do not require destructuring
