# Design Token API

The purpose of this project is to allow you to abstract design decisions from any platform in a single location.

## Diary

So far I have:

- created the folder structure
- implemented a compiler for ES6
- tested a simple function using template literals
- added loop through list of plugins functionality
- added function which will create a property definition of CSS property given a name, or create your own

## Todo

- Specify where file should output (how should this work considering it should support formats/different platforms?)
- Create an easier way to output strings
- Test how to reference values from own config
- Look at how to add unit tests
- How can I change plugin so `output()` function can be used to provide string to write without having to be returned in the function. Cannot include fs.write in output() function because otherwise this will do it for each function, but it needs to be combined

## Object

- `type` examples: value, class
- `config` examples `config: {format: "css"}`
- `theme` examples `theme: {color: {primary: "red"}}`


## API

- `ouput()` helps output code to a string
- `value()` transforms the ouput of a value

## Usage

To use this project first install the dependencies

```bash
npm install
```

Then run the application to test it

```bash
npm start
```
