/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
const sortBy = (arr, fn) => arr.sort((a, b) => fn(a) - fn(b));
