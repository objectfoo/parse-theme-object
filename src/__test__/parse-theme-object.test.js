const parseThemeObject = require('../../');
const data = require('./data/index');

describe('stuff', () => {
	it('should throw if called without object', () => {
		expect(() => {
			parseThemeObject();
		}).toThrow();
	});

	it('should parse provided object', () => {
		const r = parseThemeObject(data.simple);
		expect(r).toMatchSnapshot();
	});

	it('should support optional start path as string', () => {
		const r = parseThemeObject(data.simple, {
			start: 'start'
		});
		expect(r).toMatchSnapshot();
	});

	it('should support optional start path as array', () => {
		const r = parseThemeObject(data.simple, {
			start: ['start']
		});
		expect(r).toMatchSnapshot();
	});

	it('should throw if start node not found', () => {
		expect(() => {
			parseThemeObject(data.simple, {
				start: ['fakekey']
			});
		}).toThrow();
	});

	it('should blacklist properties', () => {
		const r = parseThemeObject(data.blacklist, {
			blacklist: ['blacklistme']
		});
		expect(r).toMatchSnapshot();
	});

	it('should ignore functions', () => {
		const r = parseThemeObject(data.function);
		expect(r).toMatchSnapshot();
	});

	it('should parse nested sections', () => {
		const r = parseThemeObject(data.full, {
			start: ['palette'],
			blacklist: ['contrastDefaultColor']
		});
		expect(r).toMatchSnapshot();
	});
});
