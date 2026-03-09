# 2667. Create Hello World Function

[View this Write-up on LeetCode TODO](https://leetcode.com/problems/create-hello-world-function/solutions/) | [View Problem on LeetCode](https://leetcode.com/problems/create-hello-world-function/)

> \[!WARNING]\
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

TODO

## Background

### Functions

TODO: mention that this is also included in another write-up

To solve this problem, you'll need to know the basics of functions in JavaScript. Here's a simple JavaScript function named `greet`:

```javascript []
function greet(name) {
  console.log("Hello, " + name + "!");
}
```

The syntax may be reminiscent of Java, C, or C++, except that pure JavaScript is dynamically typed, so arguments like `name` aren't declared with a type. Similarly, the return type of the function is not specified, we use the `function` keyword instead.

A few more things to note from this code:

- blocks are wrapped in braces
- [`console.log`](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) lets us print to the console (the JavaScript console if your code runs in a browser, otherwise [standard output](https://en.wikipedia.org/wiki/Standard_streams))
- strings can be double-quoted, single-quoted, or even enclosed in backticks for [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals); I used double quotes because that's the default used by [Prettier](https://prettier.io/), a popular (the most popular?) JavaScript formatter
- strings can be concatenated using `+`

The name of a function is actually optional! The following is valid code:

```javascript []
(function (name) {
  console.log("Hello, " + name + "!");
});
```

It's wrapped in parentheses because it's a function expression rather than a function declaration, and the lack of name confuses the parser.

However, despite still being runnable, the above code is not very useful. It creates a new, anonymous function object, and immediately throws it away. Nobody will ever have a chance to invoke this function, because we don't have any way to refer to it.

If we wanted to have a way to refer to the function, but insisted on not naming it, we could also assign it to a variable. As part of an assignment we also no longer need the parentheses around the function expression:

```javascript []
const greet = function (name) {
  console.log("Hello, " + name + "!");
};
```

For some reason, this is the style that LeetCode favors for its pure JavaScript templates. Except, LeetCode also uses [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var), which is a terrible example to set, because `var` is essentially deprecated. Why? Programmers have generally come to expect block-scoped variables, but `var` is function-scoped. All the modern codebases I've seen use [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) and [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) instead, and you should too. I'm assuming `var`'s behavior could not be changed or removed for backward compatibility, but there's no reason to use it in new code.

> \[!TIP]\
> **Did you know that you can modify the code provided by LeetCode?** The only rule is the updated code has to be compatible with the interface expected by LeetCode. Changing the function declaration syntax is a minor change, and I will always replace the use of `var` for pure JavaScript solutions.

### TypeScript Literal Types

Annotating primitive types (e.g. `number`, `string`, `boolean`) is one of the first concepts in TypeScript developers learn. But did you know that primitive _literals_ can also be used as TypeScript types? For example, we can express that a function doesn't just return a boolean, it always returns `true`:

```typescript []
function isNeverGonnaGiveYouUpAGoodSong(): true {
  return true;
}
```

We can also express that a function is only willing to take very specific values as an argument:

```typescript []
function announceFavoriteApple(kind: "red" | "green" | "MacBook Air"): void {
  console.log(`My favorite kind of apple is ${kind}.`);
}
```

This technique makes it possible to have type-checked constants:

```typescript []
type Event = "play-song" | "pause-song" | "skip-song";

function logEvent(event: Event): void {
  console.log(`Event received: ${event}`);
}
```

We'd get a typecheck error at "compile" time if we wrote code like `logEvent("paws-song")`, for example.

In the context of today's problem, we'll use TypeScript literal types to highlight that our function isn't returning just any string, it's always returning "Hello World"!

TODO: arrow function section

### Assignments Are Expressions

In JavaScript, as in a few other languages, assignments can be used as expressions. For example:

```javascript []
let x, y, z;
x = y = z = 5;
console.log({ x, y, z }); // prints { x: 5, y: 5, z: 5 }
```

We can parse those assignments as `x = (y = (z = 5))`. So first `z` is set to 5, but the act of doing so evaluates to 5; then `y` gets assigned that result, and the assignment of `y` evaluates to the new value of `y`; and finally `x` gets assigned that result.

You could even write code like `x = x = 5` when you want to be really sure that a variable was updated. Just kidding, don't do that! The code would work, though.

Assignments as expressions are useful when you want to update the value of a variable and also immediately use that value. For example:

<!-- prettier-ignore-start -->
```javascript []
let value = getSomeValueFromCache();
if (value == null) {
  writeValueToCache(value = computeTheValueAnew());
}
```
<!-- prettier-ignore-end -->

In this case there's not a lot of added value from the assignment expression, since we could have just as well written the equivalent:

```javascript []
let value = getSomeValueFromCache();
if (value == null) {
  value = computeTheValueAnew();
  writeValueToCache(value);
}
```

A better place to use them might be when the alternative is repeating ourselves. For example, instead of:

```javascript []
for (let line = readLineFromInput(); line != null; line = readLineFromInput()) {
  // do something with `line`
}
```

We can use an assignment as an expression:

```javascript []
let line;
while ((line = readLineFromInput()) != null) {
  // do something with `line`
}
```

However, some people take things further:

<!-- prettier-ignore-start -->
```javascript []
let line;
while (line = readLineFromInput()) {
  // do something with `line`
}
```
<!-- prettier-ignore-end -->

If you're just reading code like this for the first time, you might have to read very carefully to understand if the author meant to use an assignment as an expression, or whether the intent was to check for equality with `==` and there's a bug in the code. To avoid confusion between assignments and equality checks, some programming languages choose not to support assignment expressions. Others do, but through a different operator, for example [Python's "walrus operator"](https://docs.python.org/3/reference/expressions.html#assignment-expressions), `:=`.

In JavaScript, we're not obliged to use assignments as expressions, and some codebases [lint](https://eslint.org/docs/latest/rules/no-cond-assign) against them. If they do allow them, modern codebases will generally require that assignment expressions are highlighted in some way. If you use [Prettier](https://prettier.io/) to format your JavaScript code, it will automatically wrap assignments used as expressions with an additional layer of parentheses:

```javascript []
let line;
while ((line = readLineFromInput())) {
  // do something with `line`
}
```

Personally, I think infinite loops are underused. We could also express the above code as:

```javascript []
while (true) {
  const line = readLineFromInput();
  if (line == null) {
    break;
  }

  // do something with `line`
}
```

This has the added benefit of making the `line` variable a `const`, which is always nice. It also no longer leaks into the surrounding code (although we could have also achieved that with `for` instead of `while`).

But there's one place wherein I'm a fan of assignments as expressions -- when we use a JavaScript object as a map, and the values are non-primitives we might want to instantiate and use in the same expression. Since that was probably a mouthful, let's look at a concrete example. Here's a possible implementation of a `groupBy` function, which groups the elements of an array based on some function:

```typescript []
function groupBy<T>(
  arr: readonly T[],
  keyFn: (element: T) => string,
): Record<string, T[]> {
  const res: Record<string, T[]> = {};

  for (const element of arr) {
    res[keyFn(element)] ??= [];
    res[keyFn(element)].push(element);
  }

  return res;
}
```

We used [the nullish coalescing assignment operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment) to avoid a more verbose `if` statement for checking if a group already exists or needs to be created. However, the code above still computes `keyFn` twice for each element.

Of course, we could save the result of `keyFn` in a variable:

```typescript []
function groupBy<T>(
  arr: readonly T[],
  keyFn: (element: T) => string,
): Record<string, T[]> {
  const res: Record<string, T[]> = {};

  for (const element of arr) {
    const key = keyFn(element);
    res[key] ??= [];
    res[key].push(element);
  }

  return res;
}
```

But we could also use an assignment expression! Operators like `+=`, `*=`, and even `??=` are just more complex assignments, so they can also be used as expressions:

```typescript []
function groupBy<T>(
  arr: readonly T[],
  keyFn: (element: T) => string,
): Record<string, T[]> {
  const res: Record<string, T[]> = {};

  for (const element of arr) {
    (res[keyFn(element)] ??= []).push(element);
  }

  return res;
}
```

> \[!TIP]\
> Use assignments as expressions sparingly, only when there's an obvious benefit to doing so, and make sure that it's clear in the code that this was your intent.

## Solutions

### Inline Function Expression

To solve the problem, we can return a function expression, as already prefilled by LeetCode. However, as promised, I rewrote the `var` syntax. Also, the inner function won't consume any arguments, so we don't need to declare them:

```javascript []
/**
 * @return {Function}
 */
function createHelloWorld() {
  return function () {
    return "Hello World";
  };
}

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

In TypeScript we can amuse ourselves by adding a bunch of type annotations, using literal type annotations as described in the Background. So `creatHelloWorld` will be a function with return type `() => "Hello World"` (a function that takes no arguments and returns "Hello World"). And the inner function expression can be annotated with its return type as well:

```typescript []
function createHelloWorld(): () => "Hello World" {
  return function (): "Hello World" {
    return "Hello World";
  };
}

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

Instead of using the `function` keyword we can also use an arrow function expression. Once again, it's hard to resist adding the type annotations. In `(): "Hello World" => "Hello World"`, the first "Hello World" is the type annotation, whereas the second is the implementation.

```typescript []
function createHelloWorld(): () => "Hello World" {
  return (): "Hello World" => "Hello World";
}

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

But why should only the inner function use arrow function syntax, when we can do this:

```typescript []
const createHelloWorld: () => () => "Hello World" =
  (): (() => "Hello World") => (): "Hello World" =>
    "Hello World";

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

> \[!NOTE]\
> How good is the TypeScript parser in your head? **Can you label the meaning of each "Hello World" in the above solution?** The answer is at the bottom of this write-up!

Ok, let's take it easy for a moment. The code works just as well without explicit type annotations, because TypeScript can infer what it needs:

```typescript []
const createHelloWorld = () => () => "Hello World";

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

> \[!TIP]\
> It might seem like the syntax `() => () => ...` is still a mild form of trolling, but it's actually not. It's common in JavaScript to pass around function objects, and `() => () => ...` is a concise way of declaring a function that doesn't do any work when it's first invoked, but instead returns a function that will do some work later. You'll see code like this from time-to-time when working with [higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function). If you encounter `() => () => () => ...` however, that's probably trolling.

### Reusing the Returned Function Object

All of our `createHelloWorld` implementations so far create new functions every time they're invoked. We could instead create a function that returns "Hello World" only once, save that function in a variable, and then always return the same reference from our main function:

```typescript []
const helloWorld = () => "Hello World";

const createHelloWorld = () => helloWorld;

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

But what if we don't want to prematurely create that function object? We can initialize the variable to `null` (or `undefined`) and then do lazy initialization via `??=`, [the nullish coalescing assignment operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment) when the variable is used:

```typescript []
let helloWorld: (() => "Hello World") | null = null;

function createHelloWorld(): () => "Hello World" {
  helloWorld ??= () => "Hello World";
  return helloWorld;
}

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

We can even use the lazy initialization assignment as an expression:

```typescript []
let helloWorld: (() => "Hello World") | null = null;

const createHelloWorld = () => (helloWorld ??= () => "Hello World");

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

Since [Lodash TODO]() is available on LeetCode, we can also use [`_.memoize` TODO]():

```javascript []
/**
 * @return {Function}
 */
const createHelloWorld = _.memoize(() => () => "Hello World");

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

> \[!TIP]\
> To be clear, this is a bit of overengineering -- in most cases function objects in JavaScripts are inexpensive and ok to recreate on each execution. But you can apply the principles of caching and lazy initialization we just practiced in contexts where they make a difference, or in cases where it's important for some function object's identity to not change. (See for example [React's `useCallback` hook](https://react.dev/reference/react/useCallback).)

### Arbitrary Depth Function Nesting

Another way we can have fun is to

```typescript []
function inception(text: string, depth: number): string | (() => unknown) {
  return depth === 0 ? text : () => inception(text, depth - 1);
}

const createHelloWorld = inception("Hello World", 2);

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

```typescript []
function inception(text: string, depth: number): string | (() => unknown) {
  let res: string | (() => unknown) = text;

  while (depth-- > 0) {
    const prevRes = res;
    res = () => prevRes;
  }

  return res;
}

const createHelloWorld = inception("Hello World", 2);

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

> \[!NOTE]\
> **What happens if we inline the `prevRes` variable in the last solution?** That is, if we change the body of the loop to be simply `res = () => res;`? The answer is coming right up!

## Answers to Bonus Questions

> \[!TIP]\
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode TODO](https://leetcode.com/problems/create-hello-world-function/solutions/)! 🙏
