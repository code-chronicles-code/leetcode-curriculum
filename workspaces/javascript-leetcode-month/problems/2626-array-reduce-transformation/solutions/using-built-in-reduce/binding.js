/**
 * @param {number[]} arr
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
const reduce = Function.prototype.call.bind(Array.prototype.reduce);
