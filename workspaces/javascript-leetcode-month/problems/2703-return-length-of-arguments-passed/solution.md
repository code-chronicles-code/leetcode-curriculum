# 2703. Return Length of Arguments Passed

[View this Write-up on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/solutions/5722508/content/) | [View Problem on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/)

> \[!WARNING]\
> This page includes spoilers. For a spoiler-free introduction to the problem, see [the README file](README.md).

## Summary

There are two primary approaches to this problem:

- using [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- using [the `arguments` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

Based on the function signature provided by LeetCode, which already declares a rest parameter, we may favor the rest parameter solution, although both approaches work.

## Background

### Functions

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

> \[!NOTE]\
> **Are the two ways we saw of declaring a function different only in syntax?** If you're new to JavaScript, it's safe to consider them identical, because in practice they are. If you're an advanced JavaScript user, can you name the subtle differences? Answer will be revealed at the end of this doc!

### Rest Parameters

If we want to write a function that accepts a variable number of arguments (parameters), we can use a [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters). Declared last among the function arguments and using `...` as a prefix, a rest parameter lets us accept the _rest_ of the arguments passed to the function in a JavaScript array. This is similar to [varargs in Java](https://docs.oracle.com/javase/8/docs/technotes/guides/language/varargs.html) or [var-positional arguments in Python](https://docs.python.org/3/glossary.html#term-parameter).

Note that the code provided by LeetCode for this problem already uses a rest parameter, so we don't need to declare it, we can simply use it.

### Array `length`

We're almost ready to write a solution! Since the rest parameter will be a JavaScript array, we need to know how to check the size of a JavaScript array, and the answer is the [`length` property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)! Note that `length` gives us raw numeric data, so we don't have to invoke it like `foo.length()`, we simply read the property as `foo.length`.

> \[!NOTE]\
> **What happens if we try to _assign a value_ to an array's length?** In other words, what happens if we declare an array like `arr = [3, 1, 4, 1, 5, 9]` and then we run `arr.length = 3`? Or `arr.length = 10`? Open up your browser's JavaScript console and try it! Answer will be revealed at the end of this doc.

### `arguments` Object

We already have enough background to write our first solution, but for the second solution strategy we also need to know about [the `arguments` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments). Unlike the rest parameter, `arguments` doesn't have to be declared, it simply exists. This function works:

```javascript []
function printArguments() {
  console.log(arguments);
}
```

This also reveals another important fact about JavaScript functions -- they can be invoked with more arguments than they explicitly declare. Our `greet` function from earlier can be run as `greet("World", "Universe")` and there will be no error, although in the current implementation only the World will be greeted.

Interestingly, the `arguments` object is _not_ a JavaScript array, but it works a lot like one. For example, we can access its contents by index, and it has a `length` property just like arrays do. We call it "an array-like object", and if we wanted to make it a full-fledged array we could pass it through [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from). (Or, we could use a rest parameter instead, which is preferred in modern code.)

### Type Annotations

Although the problem category is JavaScript, it's highly highly recommended to prefer solving the problems in TypeScript. TypeScript adds type annotations to JavaScript, for greater "compile-time" safety. Many mature codebases have adopted types, so using them in our LeetCode solutions is useful.

How does it work? Enhancing JavaScript syntax has been a common long-standing practice. For example, whenever a new JavaScript syntax or API is proposed but before it becomes widely available, developers will use tooling that helps with early adoption. The tools are used to transform the code before it's delivered to users. They can transform new syntax to its older equivalent, or [polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) implementations of new APIs, so that the code can run in older environments. Meanwhile, developers get to enjoy the new language features.

TypeScript isn't considered a new JavaScript feature, it's more like a new JavaScript dialect. Pure JavaScript code is syntactically correct TypeScript, but TypeScript code using type annotations is not syntactically correct JavaScript. So TypeScript relies on the same principle of syntax enhancement. Developers can use TypeScript type annotations in their code, but these annotations are stripped before the code gets run.

Type annotations are added using a colon and the type, and they are supported in several places. For example, in TypeScript, we could have annotated our `greet` function as:

```typescript []
function greet(name: string): void {
  console.log("Hello, " + name + "!");
}
```

The `string` annotation applies to the argument, whereas the `void` annotation is for the return type of the function. Like in Java, C, and C++, `void` means we're not explicitly returning anything. Other supported types include `number`, `boolean`, and `null`.

We can also define new types, for example:

```typescript []
type StringOrNumber = string | number;
```

LeetCode's TypeScript template for this problem is unnecessarily complicated. It declares our rest parameter as an array of JSON values, and it defines a recursive type to express this! While this is interesting to illustrate the power of TypeScript, for this problem we don't care what arguments we get, we just care how many we get. Therefore I think it's sufficient to declare the arguments as being of type [`unknown`](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown). This is the safe way to say that we don't know the type. TypeScript will require us to test the type of the value before doing anything with it.

> \[!WARNING]\
> In many LeetCode problems you will see `any`, which is the _unsafe_ way of saying we don't know the type. Unlike `unknown`, `any` allows us to do _anything_ with the value. It bypasses the typechecker for that section of code, and if we're not careful it can even leak to code that interacts with that section of code. It's best to avoid `any` as much as possible.

We can additionally mark array arguments as [`readonly`](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#readonly-and-const) when we don't intend to mutate them, as you'll see below.

To learn more about types, check out [the TypeScript website](https://www.typescriptlang.org/).

## Solutions

We are now more than ready to solve the problem! Let's look at a few options for each solution strategy.

### Using Rest Parameters

As mentioned, I am going to always replace the usage of `var` in JavaScript solutions, because there's no reason to use it. I didn't bother updating the docblock, so the full solution in pure JavaScript becomes:

[View submission on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/submissions/1374676829/)

```javascript []
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
```

I did however update the types for the TypeScript solution:

[View submission on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/submissions/1374678115/)

```typescript []
function argumentsLength(...args: readonly unknown[]): number {
  return args.length;
}

/**
 * argumentsLength(1, 2, 3); // 3
 */
```

As a bonus, we can use the syntax for assigning a function expression to a variable, and combine it with the [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) syntax. (If you're new to JavaScript, we'll discuss this in more detail later.)

[View submission on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/submissions/1374678620/)

```typescript []
const argumentsLength = (...args: readonly unknown[]): number => args.length;

/**
 * argumentsLength(1, 2, 3); // 3
 */
```

Note that TypeScript type annotations are often optional, if there is enough context to infer a type. For example, the return type of the function can be inferred to be a number, because we are returning the `length` of an array, which is a number:

[View submission on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/submissions/1374678865/)

```typescript []
const argumentsLength = (...args: readonly unknown[]) => args.length;

/**
 * argumentsLength(1, 2, 3); // 3
 */
```

If you are new to TypeScript, I recommend using type annotations as much as possible to get the practice. In the future, we'll discuss where it's safe to omit them without sacrificing safety.

### Using `arguments`

If we use the `arguments` object, the rest parameter becomes unused, so we can choose to not even declare it!

[View submission on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/submissions/1374679390/)

```javascript []
/**
 * @return {number}
 */
function argumentsLength() {
  return arguments.length;
}

/**
 * argumentsLength(1, 2, 3); // 3
 */
```

However, in TypeScript, omitting the rest parameter will result in a type error in the code LeetCode uses to invoke our function! A common practice is to prefix the names of unused variables with an underscore:

[View submission on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/submissions/1374680348/)

```typescript []
function argumentsLength(..._args: readonly unknown[]): number {
  return arguments.length;
}

/**
 * argumentsLength(1, 2, 3); // 3
 */
```

We can also do something a bit funny-looking, and use an empty destructure of the rest parameter! Destructuring of the rest parameter is documented in [the rest parameters documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

[View submission on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/submissions/1374680779/)

```typescript []
function argumentsLength(...[]: readonly unknown[]): number {
  return arguments.length;
}

/**
 * argumentsLength(1, 2, 3); // 3
 */
```

Fun fact, `arguments` don't work the same way in arrow functions. [The documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) phrases it:

> Arrow functions don't have their own bindings to `this`, `arguments`, or `super`

So if we want to assign a function expression to a variable, we'll have to keep using the `function` keyword. In pure JavaScript:

[View submission on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/submissions/1374688659/)

```javascript []
/**
 * @return {number}
 */
const argumentsLength = function () {
  return arguments.length;
};

/**
 * argumentsLength(1, 2, 3); // 3
 */
```

And in TypeScript:

[View submission on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/submissions/1374688909/)

```typescript []
const argumentsLength = function (..._args: readonly unknown[]): number {
  return arguments.length;
};

/**
 * argumentsLength(1, 2, 3); // 3
 */
```

> \[!NOTE]\
> **So what does happen if we try to use `arguments` in an arrow function?** If you're an advanced JavaScript user, try it out! Answers below...

## Answers to Bonus Questions

1. **What's the difference between `function foo() {}` and `const foo = function() {}`?**

   [The documentation on defining functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#defining_functions) lists some differences among these and other ways of defining functions, but in short, in the second version the function is anonymous, whereas in the first one it is named. This could have implications for how the function shows up in stack traces.

   Additionally, when using `const` the function cannot be reassigned, but otherwise it can. For example, this code runs without errors:

   ```javascript []
   function foo() {}
   foo = 42;
   console.log(foo); // prints 42
   ```

2. **What happens if we try to assign a value to an array's length?**

   The array's length gets updated! If the new length is smaller than the old one, some array elements will be discarded. If the new length is greater than the old one, additional array slots are added. In either case, the time complexity of changing the array length ought to be constant. Increasing the length of the array doesn't allocate new memory until the new slots are used, because JavaScript supports [sparse arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#sparse_arrays).

   Let's test:

   ```javascript []
   const arr = [3, 1, 4, 1, 5, 9];
   arr.length = 3;
   console.log(arr); // prints [ 3, 1, 4 ]
   arr.length = 10;
   console.log(arr); // prints [ 3, 1, 4, <7 empty items> ]
   ```

3. **What happens if we try to use `arguments` in an arrow function?**

   If the arrow function is defined in the global scope, we'll get a `ReferenceError` that `arguments` is not defined. If the arrow function is defined within the body of a non-arrow function, we'll be accessing the `arguments` of the enclosing function!

   You can test with the following code:

   ```javascript []
   function enclosing() {
     const arrow = () => arguments.length;
     return arrow();
   }

   console.log(enclosing("a", "b", "c")); // prints 3
   console.log(enclosing("a", "b")); // prints 2
   ```

> \[!TIP]\
> Thanks for reading! If you enjoyed this write-up, feel free to [up-vote it on LeetCode](https://leetcode.com/problems/return-length-of-arguments-passed/solutions/5722508/)! 🙏
