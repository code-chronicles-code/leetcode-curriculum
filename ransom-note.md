# Thread Template

Hi friends! The REPLACE WITH DAY OF WEEK problem is [383. Ransom Note](https://leetcode.com/problems/ransom-note/). We have live discussions at **8-8:15am**, **7-7:15pm**, and **9:30-9:45pm** (all times California time) for anyone who wants to discuss or see the problem solved live.

* **Baseline goal**: Get accepted in any way at all! Hint: ||one way to solve it would be for each character in "abcdefghijklmnopqrstuvwxyz" count whether it occurs more times in the magazine than in the ransom note||.
* **Stretch goal**: Iterate only once over `ransomNote` and only once over `magazine`. If your language has built-in libraries for character counting try a version of the solution that doesn't use them.

I look forward to seeing your solutions! 

Some reference solutions for inspiration:
* O(alphabet size) iterations ([TypeScript](https://leetcode.com/problems/ransom-note/submissions/1048453389/), [Python](https://leetcode.com/problems/ransom-note/submissions/1048446556/), [Java](https://leetcode.com/problems/ransom-note/submissions/1048451774/), [Ruby](https://leetcode.com/problems/ransom-note/submissions/1048458944/))
* one iteration only ||using frequency map|| ([TypeScript](https://leetcode.com/problems/ransom-note/submissions/1021115482/), [Python](https://leetcode.com/problems/ransom-note/submissions/1048445154/), [Java](https://leetcode.com/problems/ransom-note/submissions/1048449200/), [Ruby](https://leetcode.com/problems/ransom-note/submissions/1048459505/), [C](https://leetcode.com/problems/ransom-note/submissions/1048456674/))
* with some help from built-ins ([Python](https://leetcode.com/problems/ransom-note/submissions/1048442249/), [Ruby](https://leetcode.com/problems/ransom-note/submissions/1048443409/))

# Notes for Facilitators

## Checklist for a good session:

* controlled the clock
  * started on time
  * ended on time
* fostered a positive learning environment
  * led the discussion with enthusiasm
  * involved the audience
  * confirmed that people understand the code being shown
* covered the solution using 26 iterations through the inputs
  * encouraged the audience to consider hacky solutions when they can't think of something better
  * mentioned that 26 times the size of the inputs is still small enough to be only "millions" of operations, so it's good enough to get accepted
* covered the solution using frequency map, only using one iteration
  * explained how to avoid if statements for setting up the frequency map, for example `freq.get(c, 0)` in Python, `(freq[c] ?? 0)` in JavaScript, and `freq.getOrDefault(c, 0)` in Java

Bonus points:

* got at least 2 people to share their code during the session
* explained that we can use an array of size 26 for the frequencies
  * if time, got someone to actually code this solution, but at a bare minimum showed a solution and shared a link to it
* showed built-ins such as Python's `Counter` or Ruby's `.tally` as a way to quickly get frequency maps

## Code Review:

* Variables / Operations
  * Clear and concise variable names
  * Using let instead of const when variable isn't reassigned
  * Extra variables that could be inlined (variables only used once)
  * Using strict equality (For JS and TS)
  * Use defaults everytime we use dictionary/object/map
  * Use [tenary operators](https://en.wikipedia.org/wiki/Ternary_conditional_operator)
* Optimization
  * Space Complexity
    * Can solve using one frequency map.
    * Can iterate through O(alphabet size) and count the occurance between magazine and ransom note
* Other
  * See if other languages allows [foreach](https://en.wikipedia.org/wiki/Foreach_loop) to iterate through the input
  * Used built-ins such as Python's `Counter` or Ruby's `.tally` to get frequency maps

