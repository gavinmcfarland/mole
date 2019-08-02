local martinis = import './theme/test.libsonnet';

{
	number: {
		'minor second'	: 1.067,
		'major second'	: 1.125,
		'minor third'	: 1.2,
		'major third'	: 1.25,
		'perfect forth'	: 1.333,
		'dim fith'		: 1.414,
		'perfect fith'	: 1.5,
		'minor six'		: 1.6,
		'golden ratio'	: 1.168,
		'silver ratio'	: 0,
		'major sixth'	: 1.667,
		'minor seventh'	: 1.778,
		'major seventh'	: 1.875,
		'octave'		: 2,
		'major tenth'	: 2.5,
		'major eleventh': 2.667,
		'major twelfth'	: 3,
		'double octave'	: 4
	},
	font: {
		size: [
			std.ceil(16 * std.pow($.number['golden ratio'], n))
			for n in std.range(0, 5)
		],
		style: {
			default: {
				'font family': 'arial',
				'line height': '1.4',
				'letter spacing': '0.2em'
			},
			heading: self.default + {
				'font weight': '500'
			},
			link: self.default + {
				'text decoration': 'underline'
			},
			caps: self.heading + {
				'letter spacing': '0.5em',
				'text transform': 'uppercase'
			}
		}
	},
	color: {},
	'Vodka Martini': martinis['Vodka Martini'],
	Manhattan: {
		ingredients: [
		{ kind: 'Rye', qty: 2.5 },
		{ kind: 'Sweet Red Vermouth', qty: 1 },
		{ kind: 'Angostura', qty: 'dash' },
		],
		garnish: importstr './theme/garnish.txt',
		served: 'Straight Up',
	},
}
