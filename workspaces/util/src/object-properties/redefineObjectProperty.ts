import type { PropertyDescriptorOf } from "@code-chronicles/util/object-properties/types";

/**
 * Like `Object.defineProperty`, but maps the previous property descriptor
 * through the given function.
 */
export function redefineObjectProperty<TObj, TPropertyKey extends keyof TObj>(
  obj: TObj,
  property: TPropertyKey,
  redefineFn: (
    prevDescriptor: PropertyDescriptorOf<TObj[TPropertyKey]> | undefined,
  ) => PropertyDescriptorOf<TObj[TPropertyKey]>,
): TObj {
  return Object.defineProperty(
    obj,
    property,
    redefineFn(Object.getOwnPropertyDescriptor(obj, property)),
  );
}
