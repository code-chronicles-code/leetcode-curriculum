/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
function sortBy(arr, fn) {
  const memoizedFn = _.memoize(fn);
  return arr.toSorted((a, b) => memoizedFn(a) - memoizedFn(b));
}
