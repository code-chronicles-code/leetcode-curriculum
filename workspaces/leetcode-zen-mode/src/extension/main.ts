import { patchFileReader } from "./patchFileReader.ts";
import { patchWebpackChunkLoading } from "./patchWebpackChunkLoading.ts";
import { patchXhr } from "./patchXhr.ts";

function main() {
  // LeetCode's GraphQL client makes requests through `XMLHttpRequest`, then
  // reads the data as `Blob` objects using the `FileReader` API.
  //
  // So we will label `Blob` objects from `XMLHttpRequest` responses with a
  // special symbol, and then later, when reading from the marked `Blob`
  // objects, we will rewrite the data a bit.
  patchXhr();
  patchFileReader();

  // Additionally, we will patch some of the actual page code! We will do so
  // by trying to intercept `webpack` chunk loading, so that we can patch the
  // modules used by the page.
  patchWebpackChunkLoading();
}

main();
