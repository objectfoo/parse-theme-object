module.exports = {
	simple: {
		a: 'a',
		start: {
			b: 'b'
		}
	},
	blacklist: {
		a: 'a',
		blacklistme: 'color'
	},
	function: {
		a: 'a',
		fn: () => {}
	},
	full: {
		other: {
			thing: '#otherthing'
		},
		palette: {
			type: 'light',
			common: {
				black: '#000',
				white: '#fff',
				transparent: 'rgba(0, 0, 0, 0)',
				fullBlack: 'rgba(0, 0, 0, 1)'
			},
			primary: {
				50: '#prim50',
				100: '#prim100',
				contrastDefaultColor: 'light'
			},
			secondary: {
				50: '#seco50',
				100: '#seco100',
				contrastDefaultColor: 'light'
			},
			'shades': {
				'dark': {
					'text': {
						primary: 'rgba(255, 255, 255, 1)',
						secondary: 'rgba(255, 255, 255, 0.7)'
					}
				}
			}
		}
	}
};
