/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
const sortBy = (arr, fn) => arr.toSorted((a, b) => fn(a) - fn(b));
