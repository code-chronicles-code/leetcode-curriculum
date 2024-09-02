# 2677. Chunk Array

[View this Write-up on LeetCode](https://leetcode.com/problems/chunk-array/solutions/5727606/content/) | [View Problem on LeetCode](https://leetcode.com/problems/chunk-array/)

> [!WARNING]
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

In addition to ignoring LeetCode's plea and using [`_.chunk`](https://lodash.com/docs/#chunk), we have at least two more options:

- iterate over the input one element at a time, placing each element into the appropriate chunk as we process it
- grab an entire slice of the input at once, using either the built-in [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) or our own implementation

After solving this problem you can also easily adapt your solution to solve [2022. Convert 1D Array Into 2D Array](https://leetcode.com/problems/convert-1d-array-into-2d-array/)!

## Background

### Accessing the Elements of an Array

Like many programming languages, JavaScript supports accessing array elements via square brackets and zero-based indexes:

```javascript []
const arr = [3, 1, 4];
console.log(arr[2]); // prints 4
```

Today I also want to introduce another, lesser known way to access array elements, using the [`.at`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) method. Why does this method exist when we already have square brackets? If you code in Python you've probably enjoyed being able to use negative indexes to count backwards from the end of a list. In JavaScript, the square bracket syntax doesn't work with negative indexes, but `.at` does. I highly recommend the `arr.at(-1)` idiom as a simple way of accessing the last element of an array. It's much nicer to write than `arr[arr.length - 1]`.

```javascript []
const arr = [3, 1, 4];
console.log(arr.at(-1)); // also prints 4
```

> [!NOTE]  
> **So what happens if we try to do `arr[-1]` with a JavaScript array?** Open up your browser's JavaScript console and try it! The answer is at the bottom of this doc.

Another array method that supports negative indexes is [`.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). Although we won't need its negative index support today, we can definitely use this method to slice an array into chunks like this problem requests!

> [!NOTE]  
> **Can you think of other array methods that support negative indexes?** Check out the [`Array` documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). The answer is at the bottom of this doc.

### Creating and Modifying an Array

I've already used array literals in many code snippets, so if you didn't already know it perhaps you inferred that we can create a new array just by writing some values in square brackets, e.g. `[3, 1, 4]`. And if we just want an empty array we can write just the brackets, like `[]`. However, TypeScript has additional implications for array creation:

```typescript []
const arr = [3, 1, 4];
const anotherArr = [];
```

In the snippet above, `arr` is inferred to be a `number[]`, but what type should `anotherArr` be inferred to be? There's not enough information at this point. We can give TypeScript a helping hand by annotating the local variable, for example:

```typescript []
const anotherArr: string[] = [];
```

We could explicitly annotate `arr` as well, but most people don't bother, unless the inference would be incorrect. For example, if we want to indicate that `arr` may hold strings as well in the future:

```typescript []
const arr: (string | number)[] = [3, 1, 4];
```

As for modifying an array, there are many mutating methods but the one that's most relevant for today's problem is [`.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push). We will use `.push` to build up chunks.

> [!TIP]  
> **An array in JavaScript makes for a great stack data structure.** In addition to `.push` there's also [`.pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) and we can simulate a peek with the aforementioned `.at(-1)`!

### Iterating Over an Array

How many ways of iterating over an array can you think of? There are surprisingly many in JavaScript.

In [an earlier write-up](../2727-is-object-empty/solution.md), we talked about `for...in` loops. A `for...in` loop gives us the keys of an object which for an array means its indexes, from 0 to one less than the array length. However, a `for...in` loop will stringify numeric keys, which is not something we need when working with arrays.

When working with arrays, it's much more common to use a [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop. I even got asked about this distinction in an interview before. A `for...of` loop works with any object which implements [the iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol), which arrays do:

```javascript []
for (const element of [3, 1, 4]) {
  console.log(element); // prints 3, then 1, then 4
}
```

> [!WARNING]  
> **Don't use `for...in` loops with arrays.** People who read your code will probably think it's a bug and that you meant to use `for...of` instead. If you do want to iterate over the indexes of an array, and you don't want to manually manage a cursor, use a `for...of` loop and the array's `.keys`, which is more explicit and also avoids the string conversion. This method will be introduced in a bit.

JavaScript also supports classic [`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) loops using the same syntax as C, C++, Java, and other related languages. You can use such a loop if you want to manage the index manually:

```javascript []
const arr = [3, 1, 4];
for (let i = 0; i < arr.length; ++i) {
  console.log(arr[i]); // prints 3, then 1, then 4
}
```

> [!NOTE]  
> **How come in a `for...of` loop we can declare the iteration variable using `const` but in a simple `for` loop we must use `let`, which is the mutable counterpart of `const`?** My interpretation is at the bottom of the doc.

Loop statements aren't the only ways to iterate over JavaScript arrays! When `for...of` loops weren't part of the language, it was very common to use the [`.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method to iterate over the array elements. The `.forEach` method accepts a function object as argument, and it's common to use an inline anonymous function expression:

```javascript []
const arr = [3, 1, 4];
arr.forEach(function (element) {
  console.log(element); // prints 3, then 1, then 4
});
```

A `.forEach` is great when you want both the element and the index, since it invokes the given function with both:

```javascript []
const arr = [3, 1, 4];
arr.forEach(function (element, index) {
  console.log(element + " " + index); // prints "3 0", then "1 1", then "4 2"
});
```

The `.forEach` method even lets us have a reference to the array itself! This is rarely necessary, but it could be useful if the array isn't saved in any variable and we want to refer to it within the function:

```javascript []
[3, 1, 4].forEach(function (element, index, arr) {
  console.log(element + " " + index); // prints "3 0", then "1 1", then "4 2"
  console.log(arr); // prints [ 3, 1, 4 ] each time
});
```

I mentioned that it's common to use an anonymous function expressions as the argument to `.forEach`, but we can also pass in named functions by their name. For example, `[3, 1, 4].forEach(console.log)` is perfectly valid syntax! The result may be slightly surprising, however. It's time for a bonus question!

> [!NOTE]  
> **What is the output of `[3, 1, 4].forEach(console.log)`?** You can test in your browser's JavaScript console. As always, the answer is at the bottom of the doc.

In addition to all of the above, arrays have [`.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys) and [`.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) methods, which can be used to iterate over the indexes and index-element pairs respectively. Both of these methods return iterable objects, so they can be used with `for...of` loops:

```javascript []
for (const index of [3, 1, 4].keys()) {
  console.log(index); // prints 0, then 1, then 2
}

for (const entry of [3, 1, 4].entries()) {
  console.log(entry); // prints [ 0, 3 ], then [ 1, 1 ], then [ 2, 4 ]
}
```

Note that the index comes first in the `.entries`. If you choose to use this method, you'll likely want to combine it with an [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring):

```javascript []
for (const [index, element] of [3, 1, 4].entries()) {
  console.log(index + " " + element); // prints "0 3", then "1 1", then "2 4"
}
```

We can also combine `.keys` with [the `Array` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array#array_constructor_with_a_single_parameter) to simulate Python's [`range`](https://docs.python.org/3/library/functions.html#func-range) function, although we don't get to control the starting point or the step:

```javascript []
for (const index of Array(10).keys()) {
  console.log(index); // prints 0, 1, 2, 3, ..., 9
}
```

For a complete API, arrays also have a [`.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values) method, which returns an iterator over the array's elements. Since a `for...of` loop over the array itself iterates over the array's elements, the only reason to use `.values` is if you really really want an iterator object.

> [!TIP]  
> If you aren't sure what kind of iteration to use, keep it simple and use a `for...of` loop over the array.

### Arrow Functions

In the previous section I used the `function` keyword for the inline function expressions. Note that folks will usually prefer the more concise [arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for inline anonymous functions.

The syntax is not too bad. We omit the `function` keyword and add an arrow after the closing parenthesis of the function. So `function(a, b, c) { ... }` becomes `(a, b, c) => { ... }`. A few more details:

- For a function whose body is a single `return` statement, we can omit both the braces and the `return`. For example `(a, b) => a + b` is an arrow function that takes in two values and adds them.
- If there is a single argument, the parentheses that wrap it are optional. For example `x => x * x` and `(x) => x ** 2` are both valid ways to write an arrow function that squares its argument.
- A TypeScript return type annotation, if included, comes before the arrow. So `(x: number): number => x ** 2` if we want to be explicit.

> [!NOTE]  
> **What if we want to return an object literal from an arrow function?** How does JavaScript know if the braces in `x => { x }` are intended as a block or an object literal? Try to think of a solution, then check the answer at the bottom of the doc.

### TypeScript Generics

LeetCode's template for this problem is yet again unnecessarily complicated. There is no reason to limit this function to arrays made up of JSON values, we should be able to chunk absolutely any kind of array all the same! We might therefore be tempted to update the argument type to `unknown[]` like we did for [2703. Return Length of Arguments Passed](../2703-return-length-of-arguments-passed/solution.md), but there's a small problem: the overly-complicated annotation is also included in the return type. We _could_ update the return type to `unknown[][]`, meaning an array of arrays of something mysterious, and LeetCode will be perfectly happy with this, but it's not ideal. What we'd really love to do is indicate that the return type of the function depends on the input. If the input is an array of numbers, the output will an array of arrays of numbers. If the input is an array of strings, the output will be an array of arrays of strings.

To express something like this, we can use [generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content)! The syntax for generics is similar to generics in Java, templates in C++, and similar features in other languages. We can define one or more generic type variables in angle brackets, before a function's opening parentheses, and then use those type variables for other type annotations. The TypeScript documentation gives as example an identity function, i.e. a function that returns its argument:

```typescript []
function identity<Type>(arg: Type): Type {
  return arg;
}
```

It's common and perfectly acceptable to use single-letter type variable names. For example, here's a function that repeats its argument as an array of a given size:

```typescript []
function repeat<T>(value: T, count: number): T[] {
  return Array(count).fill(value);
}
```

### TypeScript's Non-Null Assertion Operator (!)

TypeScript can be configured to varying levels of strictness, and as it turns out, the configuration used by TypeScript is quite loose. You won't need this concept to get accepted on LeetCode, but it's useful to be aware of it for stricter environments.

Specifically I'm talking about situations when some value may not be defined. Here's an example:

```typescript []
const user = users.find((u) => u.name.startsWith("M"));
console.log(user.id);
```

The code above tries to search for a user whose name starts with "M" in an array of users. It then prints the ID of that user. But what if _no_ users have a name that starts with "M"? The [`.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method doesn't throw when it doesn't find an element satisfying the condition, it returns `undefined` (which is a flavor of `null` that I'll talk about more later). But we'll get an error on the next line of code, when we try to read the `id` property of an `undefined` value.

TypeScript can detect this and warn us that `user` may be `undefined` when we try to access its `id`. On LeetCode it won't, because I guess they haven't enabled [`strictNullChecks`](https://www.typescriptlang.org/tsconfig/#strictNullChecks), but this is not recommended. We can make TypeScript happy with an explicit check:

```typescript []
const user = users.find((u) => u.name.startsWith("M"));
if (user) {
  // TypeScript knows that `user` must exist if we entered this block.
  console.log(user.id);
}
```

The other option is to use a postfix `!` more formally known as [the "non-null assertion operator"](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-). This tells TypeScript that we're _certain_ an expression will be defined and not null.

We can do it when `user` is first assigned:

```typescript []
const user = users.find((u) => u.name.startsWith("M"))!;
console.log(user.id);
```

Or when it's used:

```typescript []
const user = users.find((u) => u.name.startsWith("M"));
console.log(user!.id);
```

If you're going to use `!`, it's probably better to do it when a variable is first defined, so that we don't have to do it for every individual acccess. However, it's best to avoid `!` entirely, since it can hide bugs in our code.

The only times I condone `!` are when we've just indirectly guaranteed that a value is defined but TypeScript can't tell, and we'd have to jump through too many hoops to convince it. We'll see some examples of this in the solutions. `arr.at(-1)` could be `undefined` in the case of an empty array, but if we've separately guaranteed that it's not empty, `!` seems ok.

Note that `!` is not enforced at runtime, because it's a TypeScript feature not a JavaScript feature, so it gets stripped along with any other TypeScript annotations. The following code typechecks successfully and runs without errors, even though it lies!

```typescript []
const x = null;
console.log(x!);
```

So if there's a runtime error in code using `!`, it's probably because the code can't handle a nullish value, and not because of the `!` itself.

## Solutions

Armed with all of this background knowledge, let's write some solutions to the problem at hand!

### Using `_.chunk`

First, let's get the naughty solution out of the way, taking advantage of the fact that LeetCode's JavaScript/TypeScript environment includes [Lodash](https://lodash.com/).

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1375884921/)

```javascript []
/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
function chunk(arr, size) {
  return _.chunk(arr, size);
}
```

Or in TypeScript, using generics for the type annotations as promised:

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1375885148/)

```typescript []
function chunk<T>(arr: readonly T[], size: number): T[][] {
  return _.chunk(arr, size);
}
```

To really rub it in, since the interface LeetCode is asking for is the same as the interface from Lodash, we can simply define a `chunk` variable that's _equal_ to the Lodash function. [Object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) makes this really fun:

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1375885828/)

```javascript []
/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
const { chunk } = _;
```

### Processing Individual Elements

With the most entertaining solution out of the way, let's take the problem seriously for a moment and implement our own algorithm. From what I've seen, a lot of folks adopt an algorithm similar to this one:

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1375886147/)

```typescript []
function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  // Maintain a variable for the current chunk we're assembling.
  let currentChunk: T[] = [];

  for (const element of arr) {
    currentChunk.push(element);

    // When we have a full chunk, add it to the result and reset.
    if (currentChunk.length === size) {
      res.push(currentChunk);
      currentChunk = [];
    }
  }

  // Unfortunately this means we need an additional check for the last chunk.
  if (currentChunk.length > 0) {
    res.push(currentChunk);
  }

  return res;
}
```

However, I prefer algorithms that don't require us to remember to handle the last chunk specially. Not only is it easy to forget to do so, it feels inelegant to repeat ourselves slightly. So let's write a "streaming" algorithm -- that is, let's make sure that the variable holding the result is up-to-date after every individual element we process. If someone where to freeze time while our algorithm is running, our result would be correct based on the elements we had seen so far.

Contrast this with the algorithm above, which only has an up-to-date result immediately after we finish a chunk. While a chunk isn't full, it's not included in the result variable, so we have to remember to address this with an additional check.

How do we write a "streaming" algorithm? Whenever we process an element we need to decide whether to add it to an existing chunk or to start a new chunk. We could do so by checking if the index of the element is divisible by the desired chunk size:

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1376851999/)

```typescript []
function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  for (let i = 0; i < arr.length; ++i) {
    // New chunks start at indexes divisible by `size`.
    if (i % size === 0) {
      res.push([]);
    }

    // We can be certain that `res` is not empty because we'll add something
    // to `res` during the very first iteration, when `i` is 0.
    const lastChunk = res.at(-1)!;
    lastChunk.push(arr[i]);
  }

  return res;
}
```

If, like me, you prefer focusing on the element rather than the index, there's good news! We can also do it without an index, by checking if the last chunk can take any more elements:

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1376851328/)

```typescript []
function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  for (const element of arr) {
    // If there's no last chunk, or if the last chunk is full, start a new
    // chunk.
    if (res.length === 0 || res.at(-1)!.length === size) {
      res.push([]);
    }

    res.at(-1)!.push(element);
  }

  return res;
}
```

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1376850190/)

We can also iterate over both the element _and_ the index if we use `.forEach`. Note that I went with an arrow function expression this time:

```typescript []
function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  arr.forEach((element, index) => {
    // New chunks start at indexes divisible by `size`.
    if (index % size === 0) {
      res.push([]);
    }

    res.at(-1)!.push(element);
  });

  return res;
}
```

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1376849608/)

Or we can loop over the array's `.entries`:

```typescript []
function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  for (const [index, element] of arr.entries()) {
    // New chunks start at indexes divisible by `size`.
    if (index % size === 0) {
      res.push([]);
    }

    res.at(-1)!.push(element);
  }

  return res;
}
```

> [!TIP]  
> **I've found the "streaming" framing to be a useful one for many algorithm problems.** Whenever we have to do something with an array, you can ask yourself: what would be the correct answer if the input was an empty array? What would be the correct answer if we only ever saw the first array element? What would be the correct answer if we only ever saw the first two array elements? And so on. Make having a correct intermediate result an invariant of your code.

### Grabbing Slices

Instead of processing the array elements individually, we can slice multiple elements from the array collectively. If we do so, our outermost loop will move in steps of `size`:

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1376847528/)

```typescript []
function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }

  return res;
}
```

Note that even if the last chunk is smaller than `size`, we didn't have to defend against going out of bounds. The `.slice` method is smart enough to do the right thing, it just gives us fewer elements at the end if needed.

If we prefer to minimize the use of built-in functions, we can also implement our own slicing function, once again using generics:

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1376854900/)

```typescript []
function slice<T>(arr: readonly T[], start: number, end: number): T[] {
  const res: T[] = [];

  for (let i = start; i < end && i < arr.length; ++i) {
    res.push(arr[i]);
  }

  return res;
}

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    res.push(slice(arr, i, i + size));
  }

  return res;
}
```

If you're slightly bothered by the apparent repetition between `i += size` and `i + size`, we can tweak the `slice` API a bit and also write a slightly more creative `for` loop:

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1376855468/)

```typescript []
function slice<T>(arr: readonly T[], start: number, size: number): T[] {
  const res: T[] = [];

  for (let i = start; res.length < size && i < arr.length; ++i) {
    res.push(arr[i]);
  }

  return res;
}

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    res.push(slice(arr, i, size));
  }

  return res;
}
```

> [!TIP]  
> **Whenever you see an array being built via `.push` within a `for` loop, that should register in your mind as a code smell.** Could we have used [`.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) instead? If yes, then we should. Here, we aren't mapping over the entire array in any of the loops, so that's why I decided to stick with repeated `.push`.

I'm not going to explain [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) today, but I couldn't resist including this solution as a teaser:

[View submission on LeetCode](https://leetcode.com/problems/chunk-array/submissions/1376856214/)

```typescript []
function* generateSlice<T>(
  arr: readonly T[],
  start: number,
  size: number,
): Generator<T, void, void> {
  for (let i = start; size > 0 && i < arr.length; ++i, --size) {
    yield arr[i];
  }
}

function* generateChunks<T>(
  arr: readonly T[],
  size: number,
): Generator<T[], void, void> {
  for (let i = 0; i < arr.length; i += size) {
    yield Array.from(generateSlice(arr, i, size));
  }
}

function chunk<T>(arr: readonly T[], size: number): T[][] {
  return Array.from(generateChunks(arr, size));
}
```

## Answers to Bonus Questions

1. **What happens if we try to access a negative index on a JavaScript array using square brackets (i.e. property access) syntax?**

   It doesn't crash, it simply returns `undefined`, the same as when we access any other property on an object that doesn't have that property. If you're new to JavaScript, you will soon discover that JavaScript has not one but two "nullish" values. The first is `null`, which is like `null` / `nil` / `None` in other programming languages, and the second is `undefined`. These are distinct values with different semantics, but unless there's a very good reason for it, I don't recommend trying to treat `null` and `undefined` differently in your code. You can pretend that `null` and `undefined` don't both exist by using a _loose_ comparison to `null`:

   ```javascript []
   const x = null;
   const y = undefined;
   console.log(x == null); // prints true
   console.log(y == null); // prints true
   ```

   Comparing against `null` is the only time I will advocate for using `==` instead of `===` in JavaScript.

2. **What `Array` methods support negative indexes?**

   In addition to `.at` and `.slice` as mentioned in the Background section, at the time of this writing there's [`.splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), its copying version [`.toSpliced`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced), and [`.with`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with). `.with` is to writes as `.at` is to reads.

3. **How come in a `for...of` loop we can declare the iteration variable using `const` but in a simple `for` loop we must use `let`, which is the mutable counterpart of `const`?**

   If you know of an authoritative reference that explains this, let me know. My intuition is that `const` vs. `let` is enforced at the _syntax_ level. If a value is a `const`, it can only be on the left side of an `=` once. In a `for...of` loop, syntactically this is indeed the case. (I'm counting the declaration within a `for...of` loop as a fancy `=`.) In a regular `for` loop, the `++` (which is effectively `+= 1`) counts as a second `=`, so we are forced to use `let`.

   Another interpretation is that in a `for...of` loop, the variable we use for iteration goes out of scope at the end of the loop and is _recreated_ with a new value at the start of the next iteration, rather than reassigned. In a regular `for` loop, the iteration variable must persist so that it can be updated. But I'm not sure if this is what actually happens under the hood. If you do, please let me know!

   In any case, I encourage you to use `const` in `for...of` loops, because we can. I recommend using `const` over `let` everywhere possible.

4. **What is the output of `[3, 1, 4].forEach(console.log)`?**

   Remember that `.forEach` invokes the function we give it with more than just one argument. It invokes it with an element, an index, and a reference to the array. So expanding the snippet into multiple statements, it's as if we are running the code:

   ```javascript []
   const arr = [3, 1, 4];
   console.log(3, 0, arr);
   console.log(1, 1, arr);
   console.log(4, 2, arr);
   ```

   In Node, the output will be something like:

   ```
   3 0 [ 3, 1, 4 ]
   1 1 [ 3, 1, 4 ]
   4 2 [ 3, 1, 4 ]
   ```

5. **What if we want to return an object literal from an arrow function?**

   If there's a brace after the arrow, it's interpreted as a block, not as an object. So `x => { x }` would be an arrow function that never returns. Its body has a single statement, `x`, which I guess acknowledges that `x` exists, and does nothing with it at all. Really, we should write it as `x => { x; }` to be clear (though [semicolons are often optional in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion)).

   If we want the brace to be parsed as an object literal, we just need to make sure there's something else after the arrow. Gratuitous parentheses do the trick, so `x => ({ x })` is an arrow function that wraps its argument in an object:

   ```javascript []
   const fn = (x) => ({ x });
   console.log(fn(5)); // prints { x: 5 }
   ```

> [!TIP]  
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode](https://leetcode.com/problems/chunk-array/solutions/5727606/content/)! 🙏
