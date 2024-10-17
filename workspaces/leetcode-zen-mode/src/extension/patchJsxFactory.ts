import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";
import { isString } from "@code-chronicles/util/isString";
import { assignFunctionCosmeticProperties } from "@code-chronicles/util/object-properties/assignFunctionCosmeticProperties";
import { NullReactElement } from "@code-chronicles/util/browser-extensions/NullReactElement";

type CreateElementFn = (
  this: unknown,
  elementType: unknown,
  props: unknown,
  ...children: unknown[]
) => unknown;

export function patchJsxFactory(
  createElementFn: CreateElementFn,
): CreateElementFn {
  return assignFunctionCosmeticProperties(function (_elementType, props) {
    try {
      // Remove the Difficulty dropdown on `/problemset/`. The dropdown is
      // implemented as a React element with an `items` prop which is an
      // array. We'll replace it with a React element that renders nothing.
      if (
        isNonArrayObject(props) &&
        Array.isArray(props.items) &&
        props.items.some(
          (it: Record<string, unknown>) =>
            isString(it.value) && /^easy$/i.test(it.value),
        )
      ) {
        return createElementFn.apply(this, [NullReactElement, {}]);
      }

      // Remove the non-Easy sections of the problems solved panel on user
      // profiles. These are implemented as React elements with a `category`
      // prop which is a problem difficulty.
      if (
        isNonArrayObject(props) &&
        isString(props.category) &&
        /^(?:medium|hard)$/i.test(props.category)
      ) {
        return createElementFn.apply(this, [NullReactElement, {}]);
      }
    } catch (err) {
      console.error(err);
    }

    return createElementFn.apply(
      this,
      // Slight lie but `.apply` will work with the `arguments` object.
      arguments as unknown as Parameters<CreateElementFn>,
    );
  }, createElementFn);
}
