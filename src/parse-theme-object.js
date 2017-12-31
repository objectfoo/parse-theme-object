const traverse = require('traverse');
const { pathOr, intersection, sortBy } = require('ramda');

/**
 * @param {string[]} path
 * @returns {object}
 */
const newHeader = (path) => ({ path, header: true });

/**
 * @param {string[]} path
 * @param {any} value
 * @returns {object}
 */
const newValue = (path, value) => ({ path, value });

/**
 * @param {any} value
 * @returns {boolean}
 */
const isFunction = x =>
	Object.prototype.toString.call(x) === '[object Function]';

/**
 * walk object
 * @param {object} data
 * @param {function} isBlacklisted
 * @returns {object[]}
 */
const walkObject = (data, isBlacklisted) => (
	traverse(data).reduce(function (acc, x) {
		if (this.notLeaf && !this.isRoot) {
			acc.push(newHeader(this.path));
		} else if (
			this.isLeaf &&
			!isBlacklisted(this.path) &&
			!isFunction(x)) {
			acc.push(newValue(this.path, x));
		}
		return acc;
	}, [])
);

/**
 * @param {object} data
 * @param {object} options
 * @param {string|string[]} options.start
 * @param {string[]} options.blacklist
 * @returns {object[]}
 */
const parseObject = (data, options) => {
	const cfg = options || {};
	const start = cfg.start;
	let root;

	if (start === undefined) {
		root = data;
	} else {
		const startPath = Array.isArray(start) ? start : [start];
		root = pathOr(null, startPath, data);
	}

	if (!root) {
		throw new Error('data object required');
	}
	let isBlacklisted;

	if (cfg.blacklist) {
		isBlacklisted = path => (
			intersection(cfg.blacklist, path).length > 0
		);
	} else {
		isBlacklisted = () => false;
	}

	const result = walkObject(root, isBlacklisted);
	return sortBy(item => item.path.join(), result);
};

module.exports = parseObject;
