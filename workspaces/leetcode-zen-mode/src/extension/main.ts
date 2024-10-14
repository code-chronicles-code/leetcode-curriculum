import { mapJsonBlobData } from "@code-chronicles/util/mapJsonBlobData";

import { injectJsonScriptMiddleware } from "./injectJsonScriptMiddleware.ts";
import { injectXhrBlobResponseMiddleware } from "./injectXhrBlobResponseMiddleware.ts";
import { patchWebpackChunkLoading } from "./patchWebpackChunkLoading.ts";
import { rewriteLeetCodeGraphQLData } from "./rewriteLeetCodeGraphQLData.ts";

function main() {
  // LeetCode's GraphQL client makes requests through `XMLHttpRequest`, then
  // reads the data as `Blob` objects using the `FileReader` API.
  //
  // So we will inject some middleware to rewrite `XMLHttpRequest` responses
  // a bit.
  injectXhrBlobResponseMiddleware((xhr, blob) => {
    if (xhr.responseURL === "https://leetcode.com/graphql/") {
      try {
        return mapJsonBlobData(blob, rewriteLeetCodeGraphQLData);
      } catch (err) {
        console.error(err);
      }
    }

    // No-op for requests that aren't for LeetCode's GraphQL endpoint.
    return blob;
  });

  // LeetCode also reads data stored as JSON within some <script> tags within
  // the page, for example the __NEXT_DATA__ used by Next.js. We will inject
  // the middleware there as well.
  injectJsonScriptMiddleware(rewriteLeetCodeGraphQLData);

  // Additionally, we will patch some of the actual page code! We will do so
  // by trying to intercept `webpack` chunk loading, so that we can patch the
  // modules used by the page.
  patchWebpackChunkLoading();
}

main();
