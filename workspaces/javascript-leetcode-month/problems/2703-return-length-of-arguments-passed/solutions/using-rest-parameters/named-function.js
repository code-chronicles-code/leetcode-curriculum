/**
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
function argumentsLength(...args) {
  return args.length;
}

/**
 * argumentsLength(1, 2, 3); // 3
 */
