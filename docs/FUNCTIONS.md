# Functions

## definition(name, properties)

| Param     | Type       | Name         | Description                                                                      |
| --------- | ---------- | ------------ | -------------------------------------------------------------------------------- |
| `@param`  | `{Srting}` | `name`       | The name of the property you want to look up, or create                          |
| `@param`  | `{Object}` | `properties` | An outline of the property, or properties you want to retrieve a definition for. |
| `@return` | `{Object}` |              | Returns a object with the property's `name`, `abbr`, `parent` and `children`     |

An example of a defition look up
```js
{
    name: 'padding',
    abbr: 'p',
    children: [
    { name: 'top', abbr: 't', parent: 'padding' },
    { name: 'right', abbr: 'r', parent: 'padding' },
    { name: 'bottom', abbr: 'b', parent: 'padding' },
    { name: 'left', abbr: 'l', parent: 'padding' }
    ]
}
```

## process(data,meta)

| Param     | Type       | Name   | Description                                                                                                                                                                                  |
| --------- | ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@param`  | `{Object}` | `data` | The token or data you wish to process                                                                                                                                                        |
| `@param`  | `{Object}` | `meta` | Any meta data you want to be attached while the data is being processed in the form of key value pairs. Use an array for the value to specify a different value for each level of the token. |
| `@return` | `{Object}` |        | Returns a collection where the token has been separated into `values` and `children` so it can be iterated for use in templates.                                                             |

An example of processed data
```js
{
    value: 'headingColor',
    type: 'var',
    children: [{
        value: 'blue',
        type: 'value'
    }]
}
```

## output(template, data, path)

| Param     | Type       | Name       | Description                                                                                                                                                   |
| --------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@param`  | `{String}` | `template` | The string or template which will be written to the file. If no template is provided then the global template will be used, configured in `theme.settings.js` |
| `@param`  | `{Object}` | `data`     | The data to use with the template. If no data is provided then the template will just be outputted.                                                           |
| `@param`  | `{String}` | `path`     | Optional. Path to where to output the code. `theme.settings.js` used by default                                                                               |
| `@return` | `{Object}` |            | Returns an object with the output for each platform                                                                                                           |
