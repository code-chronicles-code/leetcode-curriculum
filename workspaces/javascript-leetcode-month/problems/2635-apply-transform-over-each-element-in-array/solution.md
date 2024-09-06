# 2635. Apply Transform Over Each Element in Array

[View this Write-up on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/solutions/5729627/content/) | [View Problem on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/)

> [!WARNING]  
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

Not counting ignoring the problem statement and using the [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method, we could:

- explicitly iterate through the input, using a classic `for` loop, a `for...of` loop, the `.forEach` method, or even a `for...in` loop (although I don't intend to show `for...in`)
- use [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to power the iteration
- use recursion
- go through some other built-in function that supports mapping, like [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) or [`Array.protoType.flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) (although this probably goes against the spirit of the problem)

Practically speaking, I think the iterative solutions using simple loops are the best. There's no need to complicate things.

If you're practicing for interviews, I'd also recommend knowing how to do it with `.reduce`, since it's sometimes asked.

## Background

I've linked a variety of topics near the solutions that use them, but I also wanted to share some explicit background on a few subjects.

### TypeScript Annotations for Functions

If you've been following [my recommended sequence of JavaScript-themed LeetCode problems](../..), this will be the first one involving a type annotation for a function. TypeScript annotations for function types look a lot like arrow function expressions, except that what follows the arrow is the return type:

```typescript []
type FunctionThatTakesTwoNumbersAndReturnsAnArrayOfStrings = (
  num1: number,
  num2: number,
) => string[];
```

Note that the argument names are just for documentation, an implementation can use different names and still pass typechecks:

```typescript []
const fn: FunctionThatTakesTwoNumbersAndReturnsAnArrayOfStrings = (a, b) => [
  `${a} apples`,
  `${b} bananas`,
];
```

Function types can use generics, specified before the parentheses for the arguments:

```typescript []
type IdentityFunction = <T>(arg: T) => T;
```

In this problem, the code provided by LeetCode uses the function type `(n: number, i: number) => number`, which means a function that takes two number arguments and returns a number. However, there's no reason to limit our code in this way. We should be able to accept more creative functions, that can map things besides numbers and return things besides numbers as well. To allow the input array elements and output array elements to be of different types, we will rewrite the function type to `(element: TIn, index: number) => TOut`, where `TIn` and `TOut` will be generic type parameters defined on the `map` function itself.

### Invoking Function Variables

Since we're going to receive function objects as arguments, it's worth discussing how we can invoke a function that's stored in a variable. The answer is simple, functions we receive in some variable are no different from functions we declare. In fact you can think of our own function declarations like `function foo() { ... }` as just creating some variable `foo`. This is even more evident when we assign some function expression to a variable, as in `const foo = function() { ... }`.

So if we receive a function argument named `fn`, we can invoke it as simply `fn()`.

If you want to get creative, check out [`Function.prototype.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and [`Function.prototype.apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply), which are some more convoluted ways of invoking a function.

### Generator Functions

Although generators aren't necessary for solving this problem, I'd like to show a solution that does use them, so I'll officially introduce them here!

A simplified way to think about a generator function is as a function that returns multiple values, one at a time. In JavaScript, it's declared using [`function*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) and uses the [`yield`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield) operator to supply values to its caller. For example, the following generator will `yield` three values and then be done:

```javascript []
function* allThePiDigitsYouWillEverNeed() {
  yield 3;
  yield 1;
  yield 4;
}
```

The most common way to consume a generator is by iterating over it:

```javascript []
for (const digit of allThePiDigitsYouWillEverNeed()) {
  console.log(digit); // prints 3, then 1, then 4
}
```

In TypeScript, we can annotate a generator function with `Generator<T>` where `T` is the type of elements we `yield`:

```typescript []
function* allThePiDigitsYouWillEverNeed(): Generator<number> {
  yield 3;
  yield 1;
  yield 4;
}
```

There is no arrow function version of `function*` at this time, so we need to use the slightly more verbose syntax. However, generator functions are true functions, and they can accept arguments and contain arbitrary code. A generator function must be invoked to create a generator object:

```javascript []
const generator = allThePiDigitsYouWillEverNeed();
```

Generators are _lazy_, they only generate values when explicitly asked to do so. The `for...of` loop above works because it repeatedly asks the generator to generate values, until the generator reports that it's done. We can also ask for values more manually, using [`.next`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next). In addition to a value, `.next` gives us a `done` boolean:

```javascript []
const generator = allThePiDigitsYouWillEverNeed();
console.log(generator.next()); // prints { value: 3, done: false }
console.log(generator.next()); // prints { value: 1, done: false }
console.log(generator.next()); // prints { value: 4, done: false }
console.log(generator.next()); // prints { value: undefined, done: true }
```

The lazy nature of generators allows us to express and safely work with infinite sequences, because the generator code is interrupted on `yield`.

```typescript []
function* allTheOddPositiveIntegers(): Generator<number, void, void> {
  let n = 1;
  while (true) {
    yield n;
    n += 2;
  }
}

const generator = allTheOddPositiveIntegers();
console.log(generator.next().value); // prints 1
console.log(generator.next().value); // prints 3
// ...and the code safely terminates, despite the apparent infinite loop
```

> [!NOTE]  
> Careful readers might have noticed that I used `Generator<number, void, void>` rather than simply `Generator<number>` in the most recent type annotation. **What's the significance of the two `void`s?** Try to do some research, then you can check the answer at the bottom of the doc!

Aside from a `for...of` loop, another way to get all of the elements of a generator is converting the generator into an array, for example using `Array.from` or the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). I'll be using that below.

### Reducing

If you're a veteran of [functional programming](https://en.wikipedia.org/wiki/Functional_programming) you likely know about the concept of reducing, also known as folding. If not, it's useful to learn, because it's the concept behind popular JavaScript libraries like [Redux](https://redux.js.org/).

A full explanation of reducing is beyond the scope of this write-up, but the gist of it is that we can use it to combine some multi-dimensional data in some way, and _reduce_ its number of dimensions. To build up your intuition of this concept, imagine that we have some list of numbers like 3, 1, 4, 1, 5, 9 and we decide to reduce it using the addition operation. That would entail putting a + between adjacent numbers to get 3 + 1 + 4 + 1 + 5 + 9 which reduces the (one-dimensional) list to a single ("zero-dimensional") number, 23. If we were to reduce the list using multiplication instead, we'd get a different result. So the reduce result depends on the operation used.

In the above examples, both addition and multiplication take in numbers, two at a time, and combine them into one. The reduce works by repeatedly applying the operation until there's only one number left. However, the result of a reduce operation doesn't have to be of the same type as the elements of the list. In TypeScript terms, a "reducer" function should satisfy the following signature, using generics:

```typescript []
type Reducer<ResultType, ElementType> = (
  accumulator: ResultType,
  element: ElementType,
) => ResultType;
```

In other words, it should take an "accumulator" of type `ResultType` and an element of type `ElementType` and combine them into a new value of type `ReturnType`, where `ResultType` and `ElementType` will depend on the context. This allows for much more complex operations to be expressed as a reduce. In cases where `ResultType` and `ElementType` are different, we will also need to provide an initial value for the accumulator.

This is why JavaScript's [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) takes in a function (the reducer) and optionally an initial value. Also note that JavaScript's `.reduce` passes in an index to the reducer function as well.

## Solutions

We're now ready to discuss some solutions!

### Using [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

As always, it's fun to ignore the demands of the problem statement and get a quick accept. Note that for implementations consisting of one statement, I opted to use arrow function syntax.

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377318070/)

```typescript []
const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] => arr.map(fn);
```

We can also get weird. If you're new to JavaScript, please ignore this next solution, it's not meant to be easy to interpret.

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377318545/)

```javascript []
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
const map = Function.prototype.call.bind(Array.prototype.map);
```

> [!NOTE]  
> **Why _does_ the above solution work?** If you want to research it, look up [`Function.prototype.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind). I'll try to explain it at the bottom of the doc.

### Iterate and Build

Any of the many ways to iterate over an array will work, for example a classic `for` loop:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377318849/)

```typescript []
function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  for (let i = 0; i < arr.length; ++i) {
    res.push(fn(arr[i], i));
  }

  return res;
}
```

A `.forEach`:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377319261/)

```typescript []
function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  arr.forEach((element, index) => {
    res.push(fn(element, index));
  });

  return res;
}
```

And even a `for...of` loop, using [`.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) to have access to the index:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377319513/)

```typescript []
function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  for (const [index, element] of arr.entries()) {
    res.push(fn(element, index));
  }

  return res;
}
```

However, as I mentioned in [another write-up](../2677-chunk-array/solution.md), I consider it a code smell to build an array through repeated, unconditional `.push` in a loop. It's begging to be replaced with a `.map`! Since this is the implementation of `.map` maybe it's the one place where the repeated `.push` pattern is forgivable. But we can also pretend we're not using that pattern by using a generator and converting it to an array in one statement:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377320009/)

```typescript []
function* lazyMap<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): Generator<TOut, void, void> {
  for (const [index, element] of arr.entries()) {
    yield fn(element, index);
  }
}

const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] => Array.from(lazyMap(arr, fn));
```

### Using [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

Some companies like asking candidates to implement other operations using only `.reduce`, so let's practice doing so.

Implementing mapping using [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) looks satisfying, and follows the functional programming principle of immutability, but the downside is that we are re-copying the result each time, so this solution has quadratic complexity. However it still gets accepted by LeetCode because of the small input sizes:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377343498/)

```typescript []
const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] =>
  arr.reduce((res: TOut[], element, index) => [...res, fn(element, index)], []);
```

For linear complexity, we should reuse the same array for each step:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377343835/)

```typescript []
const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] =>
  arr.reduce((res: TOut[], element, index) => {
    res.push(fn(element, index));
    return res;
  }, []);
```

If you're a contrarian, you may prefer to [`.reduceRight`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) and [`.reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse):

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377344271/)

```typescript []
const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] =>
  arr
    .reduceRight((res: TOut[], element, index) => {
      res.push(fn(element, index));
      return res;
    }, [])
    .reverse();
```

> [!NOTE]  
> **Instead of `.reverse`, why not replace the `.push` with [`.unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)?** The answer is at the bottom of the doc.

You might also see code like the following, using the somewhat obscure [comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator) to keep the body of the arrow function "one statement". I don't encourage this practice, but then again I don't encourage `.reduce` to begin with:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377344634/)

```typescript []
const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] =>
  arr.reduce(
    (res: TOut[], element, index) => (res.push(fn(element, index)), res),
    [],
  );
```

Note that throughout these solutions, we annotated _one_ of the arguments of the reducer function, specifically the accumulator, to help TypeScript understand that we'll end up with a `TOut[]`.

> [!TIP]  
> After learning `.reduce`, many programmers seem compelled to use it everywhere. I think `.reduce` is neat, but I find that it can often _reduce_ readability as well. We often have to trade off between code elegance and efficiency, as in the first example that used spread syntax. In such cases, let's resist the urge to show off with `.reduce` and stick to regular loops. I think `.reduce` is best when the reducer's `ElementType` and `ReturnType` (to reuse the type names from the Background section) are the same. So keep using `arr.reduce((a, b) => a + b, 0)` to sum arrays, but use it sparingly for more complex operations.

### Using Other Built-Ins

A few other built-in functions have mapping behavior we can leverage, while technically not using `.map`. For example [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) supports mapping for some reason, via a second argument:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377322951/)

```typescript []
const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] => Array.from(arr, fn);
```

Since `Array.from` already has exactly the interface we need, we can also simply alias it to the name expected by LeetCode:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377323458/)

```javascript []
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
const map = Array.from;
```

But I think it's funniest to use [`.flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap). Hey, it's not `.map`! Since LeetCode guarantees that `fn` will not return an array, this works:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377323824/)

```typescript []
const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] => arr.flatMap(fn);
```

> [!NOTE]  
> **What would happen if we used `.flatMap` in the implementation with a `fn` that returns arrays?** As always, the answer is at the bottom of the doc.

The more defensive implementation would wrap the result of `fn` in an array:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377324279/)

```typescript []
const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] => arr.flatMap((element, index) => [fn(element, index)]);
```

### Recursion

Although I like recursion, I don't think there's a good reason to use it in this problem, when iteration with simple loops works so well. But to make this write-up more comprehensive, here's a recursive solution, using an inner arrow function so that `arr` and `fn` are in scope without us having to explicitly pass them around:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377324948/)

```typescript []
function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  const doMap = (index: number) => {
    if (index === arr.length) {
      return;
    }

    res.push(fn(arr[index], index));
    doMap(index + 1);
  };

  doMap(0);

  return res;
}
```

We don't necessarily need an `index` argument, we can also use the size of the result so far:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377325373/)

```typescript []
function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  const doMap = () => {
    if (res.length === arr.length) {
      return;
    }

    res.push(fn(arr[res.length], res.length));
    doMap();
  };

  doMap();

  return res;
}
```

And, we can even merge the inner function into the main function, by using an additional argument with a [default value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters). I don't love this because it pollutes the interface of our function, but it works:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1377325862/)

```typescript []
function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
  res: TOut[] = [],
): TOut[] {
  if (res.length === arr.length) {
    return res;
  }

  res.push(fn(arr[res.length], res.length));
  return map(arr, fn, res);
}
```

Also, since the output is the same size as the input, you could modify the array to save space:

[View submission on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/submissions/1380674098/)

```typescript []
function map<TIn>(
  arr: TIn[], 
  fn: (element: TIn, index: number) => TIn,
): TIn[] {

  for (let i = 0; i < arr.length; ++i) {
    arr[i] = fn(arr[i], i);
  }

  return arr;
}
```

## Answers to Bonus Questions

1. **What is the significance of the `void`s in `Generator<number, void, void>`?**

   As it turns out generators not only _supply_ data via `yield`, they can also _receive_ data via `yield`. Have a look at [the documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield). It's valid for a generator's code to include a statement like:

   ```javascript []
   const response = yield value;
   ```

   The caller would pass in the response when invoking the generator's `.next` method, as in `generator.next(response)` instead of just `generator.next()`.

   Furthermore, a generator function can still include a normal `return` statement, it's not limited to only using `yield`. TypeScript's definition of a generator at the time of this writing is:

   ```typescript []
   interface Generator<T = unknown, TReturn = any, TNext = unknown>
     extends Iterator<T, TReturn, TNext> {
     // [interface body omitted]
   }
   ```

   The second type parameter of a generator, `TReturn`, defines what type of value the generator ultimately returns with the `return` keyword. The third type parameter, `TNext`, defines what type of value the generator expects to receive via its `.next` method.

   These are more complex uses of generators, and we didn't need them, which is why I used `void` to indicate that we won't use either of these features. The main reason I wanted to be explicit is because otherwise `TReturn` would default to `any`, and `any` is unsafe. With the two `void`s we indicate that our generator will not use a `return` statement, only `yield`, and it does not expect to receive any values via `.next`.

   It's also cool to note that generators are iterators!

2. **Why does `Function.prototype.call.bind(Array.prototype.map)` work for this problem?**

   The built-in `Array.prototype.map` is invoked like `arr.map(fn)`, but LeetCode wants us to implement the interface `map(arr, fn)` instead. How can we translate between these two interfaces? We can do so using the [`.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) method available on function objects. We can move `arr` from being the object on which we invoke a method, to being an argument:

   ```javascript []
   const builtInMap = Array.prototype.map;
   builtInMap.call(arr, fn);
   ```

   So far so good, but how do we make this accessible under the name `map`? We could start with:

   ```javascript []
   const builtInMap = Array.prototype.map;
   const map = builtInMap.call;
   ```

   The above won't work because once `builtInMap.call` is passed around, it will forget its connection to `builtInMap`. It's not properly _bound_. We can fix this with [`.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind):

   ```javascript []
   const builtInMap = Array.prototype.map;
   const map = builtInMap.call.bind(builtInMap);
   ```

   However, `.call` isn't specific to `Array.prototype.map`, it's inherited from `Function.prototype`, so we can acknowledge that by grabbing it from there:

   ```javascript []
   const builtInMap = Array.prototype.map;
   const map = Function.prototype.call.bind(builtInMap);
   ```

   The code I shared earlier simply inlines `builtInMap`.

3. **Why not replace `.push` with `.unshift` when using `.reduceRight` to build the result array? It would save a `.reverse`.**

   Adding to the end of an array with `.push` should be (amortized) constant time complexity. Adding to the beginning of the array with `.unshift` requires rewriting the index of every element in the array, so it's linear time complexity. The occasional `.unshift` here and there won't be the end of the world, but when we `.unshift` in a loop, the overall time complexity becomes quadratic. A `.reduce` or `.reduceRight` doesn't look like a loop, but it's equivalent to one, since it must traverse all the elements in the array.

   It's therefore better to stick with `.push` and `.reverse` once, maintaining linear overall time complexity.

   A [`.shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) in a loop would be non-ideal for the same reason.

4. **What would happen if we used .flatMap in the implementation with a fn that returns arrays?**

   We'd expect `map([3, 1, 4], num => [num, num])` to return `[ [ 3, 3 ], [ 1, 1 ], [ 4, 4 ] ]` but `.flatMap` flattens, so we'll get `[ 3, 3, 1, 1, 4, 4 ]` instead. Try it:

   ```javascript []
   const map = (arr, fn) => arr.flatMap(fn);
   console.log(map([3, 1, 4], (num) => [num, num]));
   ```

   If our implementation adds an additional array wrapper, it works as desired, since `.flatMap` only flattens one level. Try with:

   ```javascript []
   const map = (arr, fn) =>
     arr.flatMap((element, index) => [fn(element, index)]);
   console.log(map([3, 1, 4], (num) => [num, num]));
   ```

> [!TIP]  
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode](https://leetcode.com/problems/apply-transform-over-each-element-in-array/solutions/5729627/content/)! 🙏
