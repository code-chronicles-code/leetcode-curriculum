/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
const map = Function.prototype.call.bind(Array.prototype.map);
