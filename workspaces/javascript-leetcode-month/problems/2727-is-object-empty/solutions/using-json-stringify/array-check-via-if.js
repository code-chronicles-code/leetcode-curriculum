/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
function isEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else {
    return JSON.stringify(obj) === "{}";
  }
}
