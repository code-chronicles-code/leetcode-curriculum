/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
const filter = Function.prototype.call.bind(Array.prototype.filter);
