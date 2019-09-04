## Adding models and templates dynamically

Setup your project and install mole as a dependency

```bash
mkdir my-project
cd my-project
npm install mole --save-dev
```

Require using 

```js
const mole = require('mole')
```

Define your theme

```js
{
    colors: {
        gray: {
            '100': '#f7fafc',
            '200': '#edf2f7',
            '300': '#e2e8f0',
            '400': '#cbd5e0',
            '500': '#a0aec0',
            '600': '#718096',
            '700': '#4a5568',
            '800': '#2d3748',
            '900': '#1a202c',
        }
        // More colors...
    }
}
```

Using a model is optional in Mole so if we want to reference the theme `data` directly when can do so just by creating a template. The following uses Nunjucks

```php
// templates/textColor.njk
{% for parent, color in colors %}
    {%- for child, value in color %}
.text-color-{{parent}}-{{child}} {
    color: {{value}}
}
    {%- endfor %}
{%- endfor %}
```

Then add a configuration file to the root of your project. Named outputs are optional in Mole so you can just specify an output without a name when there is only one platform.

```js
// mole.config.js
module.exports = {
    theme: 'theme/',
    template: ['templates/textColor.njk'],
    output: { file: 'build/file.css' }
}
```

Build files using

```js
mole.build()
```
