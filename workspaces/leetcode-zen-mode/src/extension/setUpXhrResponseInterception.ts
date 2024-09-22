import nullthrows from "nullthrows";

import { GRAPHQL_XHR_RESPONSE } from "./constants.ts";

export function setUpXhrResponseInterception(): void {
  const xhrResponseDescriptor = Object.getOwnPropertyDescriptor(
    XMLHttpRequest.prototype,
    "response",
  )!;

  Object.defineProperty(XMLHttpRequest.prototype, "response", {
    ...xhrResponseDescriptor,
    get() {
      const res = nullthrows(xhrResponseDescriptor.get).call(this);

      if (
        this.responseURL === "https://leetcode.com/graphql/" &&
        res instanceof Blob &&
        res.type === "application/json"
      ) {
        Object.defineProperty(res, GRAPHQL_XHR_RESPONSE, {
          enumerable: false,
          configurable: false,
          value: undefined,
        });
      }

      return res;
    },
  });
}
