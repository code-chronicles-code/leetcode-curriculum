import type {
  AccessorPropertyDescriptorOf,
  DataPropertyDescriptorOf,
  PropertyDescriptorOf,
} from "@code-chronicles/util/object-properties/types";

export function isAccessorPropertyDescriptor<T>(
  descriptor: DataPropertyDescriptorOf<T> | undefined,
): false;

export function isAccessorPropertyDescriptor<T>(
  descriptor: PropertyDescriptorOf<T> | undefined,
): descriptor is AccessorPropertyDescriptorOf<T>;

export function isAccessorPropertyDescriptor(
  descriptor: PropertyDescriptor | undefined,
): descriptor is AccessorPropertyDescriptorOf<unknown>;

export function isAccessorPropertyDescriptor(
  descriptor: PropertyDescriptor | undefined,
): descriptor is AccessorPropertyDescriptorOf<unknown> {
  return (
    !!descriptor &&
    !Object.hasOwn(descriptor, "value") &&
    !!(descriptor.get || descriptor.set)
  );
}
