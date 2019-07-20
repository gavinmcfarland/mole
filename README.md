# Gene

Gene allows you to abstract a variety of design decisions which can be used by any platform to create your own design system however suites you. From outputting simple SASS variables, to outputting utility classes you can customise it to whatever you need.

Below is an example converting tokens to output some CSS utility classes for text styles.

Using jsonnet to write the json like config

```js
{
  text: {
    default: {
        fontFamily: 'arial',
        lineHeight: '1.4',
        letterSpacing: '0.2em'
    },
    heading: self.default + {
        fontWeight: '500'
    },
    link: self.default + {
        textDecoration: 'underline'
    },
    caps: self.heading + {
        letterSpacing: '0.5em',
        textTransform: 'Uppercase',
    }
  }
}
```
Using the following plugin
```js
function({theme, output, property, process}) {

    // Look up property declaration and it's associated abbreviations, parents, children etc
    let text = property('text') 

    // Process the token data so it's easier to use with templates
    let data = process(theme.text, {prefix: text.abbr, type: ['class', 'var', 'value']}) 

    // Apply a template to the data and output it to a file. By default it will use global configuration set in gene.config.js
    output({template: 'css/class'}, data)
}
```
Which outputs the following CSS
```css
.text {
    font-family: Arial,
    line-height: 1.4,
    letter-spacing: 0.2em
}
.text-heading {
    font-family: Arial,
    line-height: 1.4,
    letter-spacing: 0.2em,
    font-weight: 500
}
.text-link {
    font-family: Arial,
    line-height: 1.4,
    letter-spacing: 0.2em
    text-decoration: underline
}
.text-caps {
    font-family: Arial,
    font-weight: 600,
    letter-spacing: 0.5em,
    line-height: 1.4,
    text-transform: Uppercase
}
```
