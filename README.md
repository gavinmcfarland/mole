Phenotype is a platform agnostic design system generator. It allows you to create and manage your design system in a way that suites you. It's capable of handling simple design tokens for use in different platforms like iOS, Android and the web, to, entire CSS frameworks made of utility classes.

## How does it work?

It works by reading theme data which describes design traits or characteristics which are organised in any JSON like file. A set of plugins then transforms the data in different ways so it can be more easily used by templates for different platforms. The output is then written to a file or set of files for a variety of platforms depending on your configuration.

## Configure

Configure where Mole should look for your theme data, how to process the data, what platforms to support and how to output the files.

```js
{
  theme: '/theme/**/*',
  platforms: {
    'css': {
      template: 'css',
      output: {
        dir: 'src/css/'
      }
    }
  },
  plugins: [
    
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

## Plugins

Plugins are at the heart of customising Mole to suit your project. Plugins can do a variety of things and can be used within other plugins. However, the majority of plugins are used for outputting code.

```js
function({ theme, property, process, output }) {
  
  // Create or lookup a property definition 
  const property = property('text-style')

  // Structure the theme data and add other information
  const data = process(
    theme.text,
    ['class', 'var', 'value'],
    { prefix: property.abbr }
  )
  
  // Output the data using a spcific template
  output({ template: 'css/class' }, data)

}
```
