import { injectJsonParseMiddleware } from "@code-chronicles/util/browser-extensions/injectJsonParseMiddleware";

import { patchWebpackChunkLoading } from "./patchWebpackChunkLoading.ts";
import { rewriteLeetCodeGraphQLData } from "./rewriteLeetCodeGraphQLData.ts";

function main(): void {
  // LeetCode's website gets its data in at least a couple of different ways
  // (e.g. a GraphQL client that uses `XMLHttpRequest` and a <script> tag
  // holding pre-fetched data) but they all seem to ultimately go through
  // the built-in `JSON.parse` for parsing their data! So we can tweak the
  // website data by injecting some middleware into the `JSON.parse`
  // built-in.
  injectJsonParseMiddleware(rewriteLeetCodeGraphQLData);

  // Additionally, we will patch some of the actual page code! We will do so
  // by trying to intercept `webpack` chunk loading, so that we can patch the
  // modules used by the page.
  patchWebpackChunkLoading();
}

main();
