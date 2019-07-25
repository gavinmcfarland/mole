import _ from 'lodash'

const side = {
	top: { _abbr: 't' },
	right: { _abbr: 'r' },
	bottom: { _abbr: 'b' },
	left: { _abbr: 'l' }
}

// Below is a definition list of CSS properties. I'm not sure if this method of writing them is convinient, but it has been useful to learn how to do it this way.

const cSSproperties = {
	border: {
		...(() => {
			return _.reduce(
				side,
				function(result, value, key) {
					return {
						...result,
						[key]: {
							width: null,
							style: null,
							...(key === 'bottom' || key === 'top'
								? {
										left: { radius: null },
										right: { radius: null }
								  }
								: {}),
							color: null
						}
					}
				},
				{}
			)
		})(),
		collapse: null,
		color: null,
		radius: null,
		image: {
			outset: null,
			repeat: null,
			slice: null,
			source: null,
			width: null,
			spacing: null,
			style: null
		},
		_abbr: 'b'
	},
	margin: {
		...(() => {
			return side
		})(),
		_abbr: 'm'
	},
	padding: {
		...(() => {
			return side
		})(),
		_abbr: 'p'
	},
	color: null
}

// The following function creates an object which provides a name, abbreviation and if there is a parent and or any children.
//
// @param name: the name of the property you want to look up or create
// @param properties: a definition of the property you want to use if it does not already exsist
// for eg.
//
// {
// 	font: {
// 		style: { _abbr: 's'}
// 		_abbr: 'f'
// 	}
// }

export default function makeProp(name, definition = cSSproperties) {
	const part = {
		name: '',
		abbr: null,
		children: []
	}

	_.each(definition, function(children, property) {
		console.log(property)
		if (property === name) {
			part.name = property

			_.each(children, function(value, child) {
				if (child !== '_abbr') {
					part.children.push({
						name: child,
						...(value !== null ? { abbr: value._abbr } : {}),
						parent: property
					})
				} else if (child == '_abbr') {
					part.abbr = value
				}
			})
		}
	})
	console.log(part)
	return part
}
