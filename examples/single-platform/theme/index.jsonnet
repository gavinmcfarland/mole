{
	asset: {
		font: [
			'visby',
			'akkurat'
		]
	},
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
    	},
    	red: {
			'100': '#fff5f5',
			'200': '#fed7d7',
			'300': '#feb2b2',
			'400': '#fc8181',
			'500': '#f56565',
			'600': '#e53e3e',
			'700': '#c53030',
			'800': '#9b2c2c',
			'900': '#742a2a',
    	},
    	orange: {
			'100': '#fffaf0',
			'200': '#feebc8',
			'300': '#fbd38d',
			'400': '#f6ad55',
			'500': '#ed8936',
			'600': '#dd6b20',
			'700': '#c05621',
			'800': '#9c4221',
			'900': '#7b341e',
      	}
	}
}
