import invariant from "invariant";

import { assignFunctionCosmeticProperties } from "@code-chronicles/util/object-properties/assignFunctionCosmeticProperties";
import { isDataPropertyDescriptor } from "@code-chronicles/util/object-properties/isDataPropertyDescriptor";
import { redefineObjectProperty } from "@code-chronicles/util/object-properties/redefineObjectProperty";
import type { PropertyDescriptorOf } from "@code-chronicles/util/object-properties/types";

type JsonParse = typeof JSON.parse;

// The types are declared as `unknown` because the `JSON.parse` invocation
// could conceivably happen with a `reviver` parameter that can result in
// arbitrary types.
type Middleware = (value: unknown) => unknown;

/**
 * Injects a function to process and possibly replace the output of a
 * `JSON.parse` invocation before it returns.
 */
export function injectJsonParseMiddleware(middlewareFn: Middleware): void {
  redefineObjectProperty(
    JSON,
    "parse",
    (prevDescriptor: PropertyDescriptorOf<JsonParse> | undefined) => {
      invariant(
        isDataPropertyDescriptor(prevDescriptor) &&
          // TypeScript would already be willing to believe that we have a
          // function here, but we'll double check since we're dealing with
          // magic.
          typeof prevDescriptor.value === "function",
        "`JSON.parse` property descriptor didn't have the expected form!",
      );
      const prevImplementation: JsonParse = prevDescriptor.value;

      const newImplementation: JsonParse = function parse(
        this: ThisParameterType<JsonParse>,
      ): unknown {
        return middlewareFn(
          prevImplementation.apply(
            this,
            // Slight lie but `.apply` will work with the `arguments` object.
            arguments as unknown as Parameters<JsonParse>,
          ),
        );
      };

      return {
        ...prevDescriptor,
        value: assignFunctionCosmeticProperties(
          newImplementation,
          prevImplementation,
        ),
      };
    },
  );
}
