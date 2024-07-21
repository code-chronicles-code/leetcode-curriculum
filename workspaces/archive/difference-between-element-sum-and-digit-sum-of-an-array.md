# Thread Template

Hi friends! The REPLACE WITH DAY OF WEEK problem is [2535. Difference Between Element Sum and Digit Sum of an Array](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/). We have live discussions at **8-8:15am**, **7-7:15pm**, and **9:30-9:45pm** (all times California time) for anyone who wants to discuss or see the problem solved live.

* **Baseline goal**: Get accepted in any way at all!
* **Stretch goal**: Practice two ways of getting the digits of the number -- by converting to a string and getting the digits as characters, and another way without converting to a string, but grabbing the digits numerically.
* **Stretch stretch goal**:  use the `yield` keyword to solve the problem if your language supports it. (And if not, the pro move would be to use a language that does for this problem, e.g. JavaScript or Python.)

I look forward to seeing your solutions! 

Some reference solutions for inspiration:
* through string ([TypeScript](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/submissions/1047023386/), [Python](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/submissions/1047025849/))
* destructive mod from back ([TypeScript](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/submissions/1047023068/), [C](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/submissions/1047028555/))
* destructive mod from back with yield ([TypeScript](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/submissions/1047023068/), [Python](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/submissions/1047026040/))
* bonus: compute digit count then get i-th digit ([TypeScript](https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/submissions/1047969100/))

# Notes for Facilitators

## Checklist for a good session:

* controlled the clock
  * started on time
  * ended on time
* fostered a positive learning environment
  * led the discussion with enthusiasm
  * involved the audience
  * confirmed that people understand the code being shown
* covered the solution that converts the number to a string and iterates over characters
  * if necessary, explained that we shouldn't hard-code the ASCII code for '0' when converting characters to digits
* covered the solution that destructively mods the number by 10 until it's 0
  * mentioned that modulo gives us the remainder and showed with some examples (e.g. 42 % 10 is 2, 314 % 10 is 4)
  * explained that this will give us the digits in reverse order (i.e. least significant first) but that's ok for the problem
* mentioned `yield` keyword
  * if time, covered a solution using `yield`, but if not, encouraged everyone to look it up and post their solutions

## Bonus points:

* covered a full solution that uses the `yield` keyword
  * explained that `yield` interrupts the execution of the function
  * explained that building an array has a linear memory footprint (the more items, the bigger the array) whereas `yield` has a constant memory footprint (we're yielding the items one at a time when asked to, but we're not building an array)
* got at least 2 people to share their code during the session
* explained why absolute value is not necessary
* mentioned that there are also ways of getting the digits of a number numerically, but from the "front" (i.e. most significant first)
  * explained that we'd need a way to get the digit at a particular "index" in the number, as well as a way of getting the number of digits
  * explained, using examples, that logarithms can help us get the number of digits
  * explained, using examples, how to access the digit at a particular "index" in the number

## Code Review:

* Problem
  * No need for absolute value since, the sum of elements is always greater than the sum of digits.
* Variables
  * Clear and concise variable names
  * Using let instead of const when variable isn't reassigned
  * Extra variables that could be inlined (variables only used once)  
* Helper functions
  * To get digits
* Optimization
  * Brute Force: Can start 2nd index in the for loop at i + 1
  * Memory Efficiency: can use `yield` to avoid using arrays (If language allows it)
* Other
  * See if other languages allows [foreach](https://en.wikipedia.org/wiki/Foreach_loop) to iterate through the input
 
 
