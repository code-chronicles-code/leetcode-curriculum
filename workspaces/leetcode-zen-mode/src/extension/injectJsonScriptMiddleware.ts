import invariant from "invariant";
import type { JsonValue } from "type-fest";

import { jsonParseSafe } from "@code-chronicles/util/jsonParseSafe";

type ProxiedPropertyKey = "innerHTML" | "innerText" | "textContent";

type MiddlewareFn = (
  data: JsonValue,
  script: HTMLScriptElement,
  property: ProxiedPropertyKey,
) => JsonValue;

function inject<TProto extends { constructor: Function }>(
  proto: TProto,
  property: ProxiedPropertyKey,
  middlewareFn: MiddlewareFn,
): void {
  const prevDescriptor = Object.getOwnPropertyDescriptor(proto, property);

  invariant(
    prevDescriptor && prevDescriptor.get,
    `\`${proto.constructor.name}.prototype.${property}\` property descriptor didn't have the expected form!`,
  );
  const prevDescriptorGet = prevDescriptor.get;

  Object.defineProperty(HTMLScriptElement.prototype, property, {
    ...prevDescriptor,
    get(this: HTMLScriptElement) {
      const data = prevDescriptorGet.call(this);

      // If the data doesn't parse as JSON, we pass it through unchanged.
      // If it does parse as JSON, we'll run the middleware.
      const parsedData = jsonParseSafe(data);
      if (parsedData) {
        return JSON.stringify(middlewareFn(parsedData.data, this, property));
      }

      return data;
    },
  });
}

/**
 * Injects a function to process and possibly replace JSON data stored within
 * <script> tags. The middleware will run when properties such as `innerHTML`
 * get accessed, and it must return the possibly updated JSON data.
 */
export function injectJsonScriptMiddleware(middlewareFn: MiddlewareFn): void {
  inject(Element.prototype, "innerHTML", middlewareFn);
  inject(HTMLElement.prototype, "innerText", middlewareFn);
  inject(Node.prototype, "textContent", middlewareFn);
}
