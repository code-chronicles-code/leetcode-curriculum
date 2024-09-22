import { GRAPHQL_XHR_RESPONSE } from "./constants.ts";

export function setUpXhrResponseInterception(): void {
  const xhrResponseDescriptor = Object.getOwnPropertyDescriptor(
    XMLHttpRequest.prototype,
    "response",
  )!;

  Object.defineProperty(XMLHttpRequest.prototype, "response", {
    ...xhrResponseDescriptor,
    get() {
      const res = xhrResponseDescriptor.get!.call(this);
      if (
        this.responseURL === "https://leetcode.com/graphql/" &&
        res instanceof Blob &&
        res.type === "application/json"
      ) {
        (res as unknown as Record<PropertyKey, unknown>)[GRAPHQL_XHR_RESPONSE] =
          true;
      }
      return res;
    },
  });
}
