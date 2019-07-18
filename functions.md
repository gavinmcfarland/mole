# Functions

## output(template, data, path)

| Param    | Type       | Arg        | Description                                                                                                                              |
| -------- | ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `@param` | `{String}` | `template` | The string or template which will be written to the file                                                                                 |
| `@param` | `{Object}` | `data`     | The data to use with the template. If no template is provided then the a global template will be used, configured in `theme.settings.js` |
| `@param` | `{String}` | `path`     | Optional. Path to where to output the code. `theme.settings.js` used by default                                                          |

## add(color.primary).type('var')

Something which can add data and give a type

```js
color: {
    theme: {
        light: {
            color: "red",
            backgroundColor: "blue",
            headingColor: "blue",
            linkColor: "blue"
        }
    }
},
```

Maybe write a recursive function which can be given an object and then tag each level

```js
function tag(object, 'class'))
```

What is the point of defining each token so deep if they will only be used to be outputted in one way?

Do I need a visual way of tagging and transforming the data?
