# Thread Template

Hi friends! The REPLACE WITH DAY OF WEEK problem is [2413. Smallest Even Multiple](https://leetcode.com/problems/smallest-even-multiple/). We have live discussions at **8-8:15am**, **7-7:15pm**, and **9:30-9:45pm** (all times California time) for anyone who wants to discuss or see the problem solved live.

* **Baseline goal**: get accepted in any way at all!
* **Stretch goal**: try to do it in one line using the [ternary operator](https://en.wikipedia.org/wiki/Ternary_conditional_operator) if your language has one, or use a language that does if needed
* **Stretch stretch goal**: try using only bitwise operators!! hint: ||`num & 1 ` is another way of doing `num % 2`, and `num << 1` is another way of doing `num * 2`||

I look forward to seeing your solutions!

Some reference solutions for inspiration:
* ["infinite" loop](https://leetcode.com/problems/smallest-even-multiple/submissions/1041717331/) and [less suspicious loop](https://leetcode.com/problems/smallest-even-multiple/submissions/1041717510/)
* [verbose](https://leetcode.com/problems/smallest-even-multiple/submissions/1040881887/)
* [using ternary](https://leetcode.com/problems/smallest-even-multiple/submissions/1040882954/) or [fake ternary](https://leetcode.com/problems/smallest-even-multiple/submissions/1040883130/)
* [using only bitwise operators](https://leetcode.com/problems/smallest-even-multiple/submissions/1040882461/)

# Notes for Facilitators

This is a quick problem, appropriate for helping new learners build up their confidence. That said, don't assume that everyone will intuitively see the pattern. Instead, use this as an opportunity to introduce good problem-solving habits.

Checklist for a good session:

* started on time
* fostered a welcoming environment for new learners
* explained the importance of trying examples by hand to understand problems
* got everyone to witness a ternary and encouraged the use of ternaries in the future
* ended on time

Bonus points:

* explained the "infinite" loop solution and the fact that for loop conditions are optional in C-like languages
* showed what a ternary looks like in languages that don't use ?, for example Python
* used an example to demonstrate that n & 1 has the same effect as n % 2
* used an example to demonstrate that n << 1 has the same effect as n * 2
* explained the bitwise operations solution, but made it clear that this is just for fun and not considered better 

## Code Review:

* Variables / Operations
  * Clear and concise variable names
  * Using let instead of const when variable isn't reassigned
  * Extra variables that could be inlined (variables only used once)
  * Using strict equality (For JS and TS)
  * Use [tenary operators](https://en.wikipedia.org/wiki/Ternary_conditional_operator)


