# 2634. Filter Elements from Array

[View this Write-up on LeetCode](https://leetcode.com/problems/filter-elements-from-array/solutions/5746669/content/) | [View Problem on LeetCode](https://leetcode.com/problems/filter-elements-from-array/)

> [!WARNING]  
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

Not counting ignoring the problem statement and using the [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method, we could:

- explicitly iterate through the input, using a classic `for` loop, a `for...of` loop, the `.forEach` method, or even a `for...in` loop (although I don't intend to show `for...in`)
- use [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to power the iteration
- use recursion

Practically speaking, I think the iterative solutions using simple loops are the best. There's no need to complicate things.

If you're practicing for interviews, I'd also recommend knowing how to do it with `.reduce`, since it's sometimes asked.

It's also possible to solve this problem through [`.flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap), by returning an empty array from the mapping function when we want to exclude a value.

## Background

> [!TIP]  
> This problem is similar to [2635. Apply Transform Over Each Element in Array](../2635-apply-transform-over-each-element-in-array/) in that we're asked to reimplement a core array method. Check out [the write-up for that problem](../2635-apply-transform-over-each-element-in-array/solution.md) as well, because the background shared there will also be relevant here.

### Conditional Execution

JavaScript supports [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statements, of course, but there's another idiom that's commonly used for conditional execution, based on [the logical AND operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND), `&&`. Specifically, rather than writing:

```javascript []
if (condition) {
  doSomething();
}
```

JavaScript developers will often favor:

```javascript []
condition && doSomething();
```

This works because `&&` has short-circuiting behavior, meaning that it won't evaluate both operands if the result is clear after evaluating only the left operand. When is the result clear after evaluating only the left operand? Remember that the stated job of `&&` is to evaluate an _AND_ operation. It returns a truthy value if the left _and_ the right operands are both truthy. If the left operand is falsy, then it's already not the case that both operands are truthy. It doesn't matter what the right operand would evaluate to, it won't affect the overall truthiness. So we skip evaluating it entirely.

This isn't unique to JavaScript. Other languages that can implicitly treat values as booleans, such as C and C++, could also use this idiom. However JavaScript does have a feature that makes the idiom much more convenient: we don't have to think about whether `doSomething` is a `void` function or not, since `void` values can still be used as part of expressions. That is, if `doSomething` is a function that doesn't return anything then a C or C++ compiler would not be happy that we're trying to use it as part of a condition. It might emit an error message like "void value not ignored as it ought to be" and refuse to compile the code. But in JavaScript, every function returns something when it terminates. Even a function that contains no `return` statements is implicitly returning `undefined`, which is a valid value that can be used as part of a larger expression.

So `condition && doSomething()` will first evaluate `condition`, and then:

- if `condition` evaluated to falsy, the `&&` has enough context to know that the overall expression is falsy, so it short circuits and `doSomething()` never runs
- if `condition` evaluated to truthy, the `&&` doesn't have enough context and it must therefore evaluate the second operand; `doSomething()` runs and then:
  - if `doSomething()` returned a truthy value, the overall `&&` evaluates to truthy as well
  - if `doSomething()` returned a falsy value, the overall `&&` evaluates to falsy as well
  - if `doSomething()` never explicitly returned anything, it evaluates to `undefined`, which is falsy; the overall `&&` evaluates to falsy as well

The use of "truthy" and "falsy" in the above text is deliberate -- `&&` doesn't necessarily evaluate to `true` or `false`, it evaluates to the same thing as the last operand that gets evaluated. So if `condition` is falsy, then it will also be the last operand evaluated, and the overall `&&` evaluates to the same thing as `condition`, whether that's an actual `false`, a `null`, an empty string, etc. However if `condition` is a truthy value and `doSomething()` runs, then `doSomething()` will be the last operand evaluated, and the overall `&&` returns the result of `doSomething()`, which will have the appropriate truthiness.

Most of the time we don't care what the overall `&&` evaluated to -- we just piggyback on its short-circuiting behavior to get concise conditional execution. However, sometimes we do want to use the overall result. For example, [React](https://react.dev/) code often uses logical AND for conditional rendering:

```typescript []
return (
  <div>
    {error && <span>There was an error: {error.message}</span>}
    <div>Some content that should always show up</div>
  </div>
);
```

Outside JavaScript, you might have also seen `&&` used to chain a sequence of multiple shell commands: in shells that support `&&` (e.g. [Bash](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>)) if we run `cmd1 && cmd2 && cmd3 && cmd4` then the overall command stops with a failure if any command in the sequence fails. This allows us to express a linear ordering of commands such as `build && test && deploy`, which makes sure the deploy only happens if the build and the tests were successful.

JavaScript can likewise chain multiple actions or conditions with this idiom:

```javascript []
doSomething() && doSomethingElse() && doEvenMoreStuff();
```

In a large group of operands joined by multiple `&&`s, the overall `&&` expression evaluates to the same thing as the last operand that got executed, among all the operands.

Prior to the introduction of the [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) operator, `?.`, logical AND was often used instead. For example, to safely invoke `a.b.c.d()` or do nothing if any of the intermediate objects don't exist:

```javascript []
a && a.b && a.b.c && a.b.c.d && a.b.c.d();
```

Incidentally, Python also has the necessary features to support this use of logical AND, but for some reason it hasn't taken off, as far as I'm aware. (Ruby and Perl also support it, and I've seen it used, though Ruby and Perl also support the syntax `do_something() if condition`.)

> [!TIP]  
> In JavaScript, using `&&` for conditional execution is wide-spread, so even if you choose not to use this pattern in your own code, you should feel comfortable reading code that does.

One case in which `&&` can't replace `if` is in early returns. For the same reason we can't do something like `console.log(return someValue)` because there's nothing to print, we're exiting the function, we also can't do `condition && (return someValue)`. There isn't anything that the overall `&&` could evaluate to, we're exiting the function.

> [!NOTE]  
> **What about the [logical OR](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR) operator, `||`, could we use it for conditional execution or evaluation?** Take a moment to formulate your answer. I provided mine at the bottom of this write-up.

## Solutions

We're now ready to discuss some solutions!

### Using [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

As always, it's fun to ignore the demands of the problem statement and get a quick accept. Note that for implementations consisting of one statement, I opted to use arrow function syntax.

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381111784/)

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] => arr.filter(fn);
```

> [!NOTE]  
> **Why use `(element: T, index: number) => unknown` as the type annotation for the filtering function?** In particular, why not use `boolean` for the filtering function's return type? See an answer at the bottom of this write-up!

We can also get weird. If you're new to JavaScript, please ignore this next solution, it's not meant to be easy to interpret.

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381112268/)

```javascript []
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
const filter = Function.prototype.call.bind(Array.prototype.filter);
```

Understanding why the above works was a bonus question in [an earlier write-up](../2635-apply-transform-over-each-element-in-array/solution.md). Read about it there if you're curious, but otherwise don't worry about this code at this time.

### Iterate and Build

Any of the many ways to iterate over an array will work, for example a classic `for` loop. I'll be using `&&` rather than `if` throughout the code today, though you are of course welcome to use `if` statements if you prefer.

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381112503/)

```typescript []
function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  for (let i = 0; i < arr.length; ++i) {
    const element = arr[i];
    fn(element, i) && res.push(element);
  }

  return res;
}
```

We could also use a `.forEach`:

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381112774/)

```typescript []
function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  arr.forEach((element, index) => {
    fn(element, index) && res.push(element);
  });

  return res;
}
```

And even a `for...of` loop, using [`.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) to have access to the index:

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381113259/)

```typescript []
function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  for (const [index, element] of arr.entries()) {
    fn(element, index) && res.push(element);
  }

  return res;
}
```

However, as I mentioned in [another write-up](../2677-chunk-array/solution.md), I consider it a code smell to build an array through repeated, conditional `.push` in a loop. It's begging to be replaced with a `.filter`! Since this is the implementation of `.filter` maybe it's the one place where the repeated `.push` pattern is forgivable. But we can also pretend we're not using that pattern by using a generator and converting it to an array in one statement:

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381137577/)

```typescript []
function* lazyFilter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): Generator<T, void, void> {
  for (const [index, element] of arr.entries()) {
    fn(element, index) && (yield element);
  }
}

const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] => Array.from(lazyFilter(arr, fn));
```

Note that unlike `return`, a `yield` _can_ be used as one of the operands of `&&`. Whereas `return` terminates the function, `yield` merely interrupts it, and it can bring values from the outside world back into the function.

### Using [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

Some companies like asking candidates to implement other operations using only `.reduce`, so let's practice doing so.

Using [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) looks satisfying, and follows the functional programming principle of immutability, but the downside is that we are re-copying the result each time, so this solution has quadratic complexity. However it still gets accepted by LeetCode because of the small input sizes:

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381114338/)

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr.reduce(
    (res: T[], element, index) =>
      fn(element, index) ? [...res, element] : res,
    [],
  );
```

For linear complexity, we should always reuse the same array for each step, mutating it if appropriate:

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381114592/)

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr.reduce((res: T[], element, index) => {
    fn(element, index) && res.push(element);
    return res;
  }, []);
```

If you're a contrarian, you may prefer to [`.reduceRight`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) and [`.reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse):

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381115218/)

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr
    .reduceRight((res: T[], element, index) => {
      fn(element, index) && res.push(element);
      return res;
    }, [])
    .reverse();
```

You might also see code like the following, using the somewhat obscure [comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator) to keep the body of the arrow function "one statement". I don't encourage writing code like this, but it's a good idea to be comfortable reading it.

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381115765/)

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr.reduce(
    (res: T[], element, index) => (
      fn(element, index) && res.push(element), res
    ),
    [],
  );
```

Note that throughout these solutions, we annotated _one_ of the arguments of the reducer function, specifically the accumulator, to help TypeScript understand that we'll end up with a `T[]`.

### Recursion

Although I like recursion, I don't think there's a good reason to use it in this problem, when iteration with simple loops works so well. But to make this write-up more comprehensive, here's a recursive solution, using an inner arrow function so that `arr` and `fn` are in scope without us having to explicitly pass them around:

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381116246/)

```typescript []
function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  const doFilter = (index: number) => {
    if (index === arr.length) {
      return;
    }

    const element = arr[index];
    fn(element, index) && res.push(element);
    doFilter(index + 1);
  };

  doFilter(0);

  return res;
}
```

Unlike in [2635. Apply Transform Over Each Element in Array](../2635-apply-transform-over-each-element-in-array/), it's a bit harder to get rid of the index variable, because the size of the result array doesn't necessarily match the number of elements we've processed so far.

However, we can still merge the inner function into the main function, by using additional argument with [default values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters). I don't love this because it pollutes the interface of our function, but it works:

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381119504/)

```typescript []
function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
  index: number = 0,
  res: T[] = [],
): T[] {
  if (index === arr.length) {
    return res;
  }

  const element = arr[index];
  fn(element, index) && res.push(element);
  return filter(arr, fn, index + 1, res);
}
```

### Using Other Built-Ins

The [`.flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap) method is used to map each array element to a list of values, rather than a single value as im `.map`. Although not explicitly designed as filtering behavior, it can be used to filter out array elements by returning an empty list! To handle arbitrary kinds of data in the input array, elements we keep are also wrapped in lists:

[View submission on LeetCode](https://leetcode.com/problems/filter-elements-from-array/submissions/1381120126/)

```typescript []
const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr.flatMap((element, index) => (fn(element, index) ? [element] : []));
```

Looks pretty nice, doesn't it? It does have one downside, however.

> [!NOTE]  
> **Can you think of a downside to the `.flatMap` implementation of filtering?** See an answer at the bottom of the write-up.

## Answers to Bonus Questions

1. **Can the logical OR operator, `||` be used for conditional execution or evaluation?**

   Absolutely. It also has short-circuiting behavior, so it's adequate for specifying fallback behavior:

   ```javascript []
   doSomethingThatReportsFailureViaReturnValue() || logThatItFailed();
   ```

   Before JavaScript supported [default values for function arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters), `||` was often used to implement them:

   ```javascript []
   function getDigits(num, base) {
     // Default to base 10.
     base = base || 10;

     // ...
   }
   ```

   The `||=` operator can make that pattern even more concise, for example for lazy initialization:

   ```javascript []
   let someObject = null;

   function doSomethingWithSomeObject() {
     someObject ||= initializeSomeObject();

     // use someObject
   }
   ```

   However, in modern JavaScript I recommend `??=`, the [nullish coalescing assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment) operator.

2. **Why use `(element: T, index: number) => unknown` as the type annotation for the filtering function?** In particular, why not use `boolean` for the filtering function's return type?

   JavaScript will implicitly convert any value to boolean when used in a boolean context, so we don't have to force the function to return a boolean. Returning any kind of value will work fine. In fact, returning the original element within the filtering function is a pattern used for filtering out falsy values:

   ```javascript []
   const arr = [null, 42, "", 0, "hi", NaN, undefined, [], {}, true, false];
   console.log(arr.filter((elem) => elem)); // prints [ 42, "hi", [], {}, true ]
   ```

   (The [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean) constructor can be used as a function to convert any value to a boolean, so `arr.filter(Boolean)` is also commonly used for this purpose.)

3. **What's the downside to the `.flatMap` implementation of filtering?**

   It creates a lot more array objects in intermediate values, one per element to be exact. Compare this with the loop-based iterative implementations or the linear implementations using `.reduce`, which create only the output array.

> [!TIP]  
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode](https://leetcode.com/problems/filter-elements-from-array/solutions/5746669/content/)! 🙏
