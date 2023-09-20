# Thread Template

Hi friends! The REPLACE WITH DAY OF WEEK problem is [1512. Number of Good Pairs](https://leetcode.com/problems/number-of-good-pairs/). We have live discussions at **8-8:15am**, **7-7:15pm**, and **9:30-9:45pm** (all times California time) for anyone who wants to discuss or see the problem solved live.

* **Baseline goal**: Get accepted in any way at all!
* **Stretch goal**: Do it with a better time complexity than O(n^2).
* **Stretch stretch goal**: Incorporate [the "number of handshakes" formula](https://www.brightstorm.com/math/geometry/reasoning-diagonals-angles-and-parallel-lines/number-of-handshakes-at-a-party-problem-1/) into your solution!

I look forward to seeing your solutions! 

Some reference solutions for inspiration:
* baseline try everything ([TypeScript](https://leetcode.com/problems/number-of-good-pairs/submissions/1047120010/), [Python](https://leetcode.com/problems/number-of-good-pairs/submissions/1047137419/), [Ruby](https://leetcode.com/problems/number-of-good-pairs/submissions/1029689448/))
* stretch ||with frequency map as we go along|| ([TypeScript](https://leetcode.com/problems/number-of-good-pairs/submissions/1029693483/), [Python](https://leetcode.com/problems/number-of-good-pairs/submissions/1029669207/), [Ruby](https://leetcode.com/problems/number-of-good-pairs/submissions/1029691987/))
* stretch stretch ||building entire frequency map first|| ([TypeScript](https://leetcode.com/problems/number-of-good-pairs/submissions/1047135786/), [Python](https://leetcode.com/problems/number-of-good-pairs/submissions/1029672967/), [Ruby](https://leetcode.com/problems/number-of-good-pairs/submissions/1029688211/), [C](https://leetcode.com/problems/number-of-good-pairs/submissions/1047141779/))
* stretch stretch one-liner ||using a frequency map built-in|| ([Python](https://leetcode.com/problems/number-of-good-pairs/submissions/1029674137/), [Ruby](https://leetcode.com/problems/number-of-good-pairs/submissions/1029686605/))

 # Notes for Facilitators

## Checklist for a good session:

* controlled the clock
  * started on time
  * ended on time
* fostered a positive learning environment
  * led the discussion with enthusiasm
  * involved the audience
  * confirmed that people understand the code being shown
* covered the brute force solution
  * explained how to look at the problem constraints and take an educated guess regarding whether a particular time complexity will be good enough to get accepted (i.e. the "millions of operations" heuristic)
* covered the solution that uses a frequency map along the way
  * went over a specific example by hand, in detail, to show why this works
  * encouraged people to print more often in their code
* showed a solution using the handshake formula
  * if time, modified the code from the previous frequency map solution, if not enough time at least showed a complete solution and encouraged people to research it further

## Bonus points:

* got at least 2 people to share their code during the session
* discussed the handshake formula in-depth
  * showed with some small examples that the formula works
  * explained an inituitive derivation, for example: if you have N people, each one shakes hands with N - 1 others, but that counted the handshake between person A and person B twice, for both person A and person B (and this is true for all handshakes) so we have to divide by 2
  * asked somebody in the audience how many handshakes we'd have with 10 people
* showed built-ins such as Python's `Counter` or Ruby's `.tally` as a way to quickly get frequency maps

## Code Review:

* Variables / Operations
  * Clear and concise variable names
  * Using let instead of const when variable isn't reassigned
  * Extra variables that could be inlined (variables only used once)
  * Using strict equality (For JS and TS)
  * Use defaults everytime we use dictionary/object/map
* Optimization
  * Brute Force: Can start 2nd index in the for loop at i + 1 (Also satisfies i < j)
  * Built-in `count` functions can be equivalent to a loop that traverses the entire input!
* Other
  * See if other languages allows [foreach](https://en.wikipedia.org/wiki/Foreach_loop) to iterate through the input
  * Used built-ins such as Python's `Counter` or Ruby's `.tally` to get frequency maps
