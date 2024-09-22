import { setUpFileReaderReadAsTextInterception } from "./setUpFileReaderReadAsTextInterception.ts";
import { setUpXhrResponseInterception } from "./setUpXhrResponseInterception.ts";

function main() {
  // LeetCode's GraphQL client makes requests through XMLHttpRequest, then
  // reads the data as Blob objects using the FileReader API.

  // So we will label Blob objects from XMLHttpRequest responses with a
  // special symbol, and then later, when reading from the marked Blob
  // objects, we will rewrite the data a bit.

  setUpXhrResponseInterception();
  setUpFileReaderReadAsTextInterception();
}

main();
