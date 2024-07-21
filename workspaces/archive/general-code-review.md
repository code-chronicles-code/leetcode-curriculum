# General Code Review

* Variables / Operations
  * Clear and concise variable names
  * Using `let` instead of `const` when variable isn't reassigned
  * Extra variables that could be inlined (variables only used once)
  * Using strict equality (For JS and TS)
  * Use [tenary operators](https://en.wikipedia.org/wiki/Ternary_conditional_operator) to be more concise
* Other
  * See if other languages allow [foreach](https://en.wikipedia.org/wiki/Foreach_loop) if the problem requires you to iterate through input without needing the index
