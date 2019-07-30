# Mole

Mole is a platform agnostic design system generator. It allows you to create and manage your design system in a way that suites you. It's capable of handling simple design tokens for use in different platforms like iOS, Android and the web, to, entire CSS frameworks made of utility classes.

## How does it work?

It works by reading theme data which describes design traits or characteristics which are organised in any JSON like file. A set of plugins then transforms the data in different ways so it can be more easily used by templates for different platforms and languages. The output is then written to a file or set of files for a variety of platforms depending on your configuration.

## Configure

Configure where Mole should look for your theme data, what templates to use, what data model to use and where to output your files.

Below if a simple example that supports just one output

```js
{
	theme: 'index.js',
	template: ['border', 'color', 'width', 'flex'],
	output: [{ file: 'styles.css' }]
}

```

Below is a more complex example with named outputs
```js
{
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

Theme data can be stored in one file, or several files and or directories. It can be written in, `js`, `json`, `yaml` and many more formats including `jsonnet`.

```js
{
    colors: '',
    fonts: '',
    sizes: ''
{
```

## Development

```bash
npm install
```

```bash
npm run build
```
