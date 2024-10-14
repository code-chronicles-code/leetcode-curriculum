import type {
  AccessorPropertyDescriptorOf,
  DataPropertyDescriptorOf,
  PropertyDescriptorOf,
} from "@code-chronicles/util/object-properties/types";

export function isDataPropertyDescriptor<T>(
  descriptor: AccessorPropertyDescriptorOf<T> | undefined,
): false;

export function isDataPropertyDescriptor<T>(
  descriptor: PropertyDescriptorOf<T> | undefined,
): descriptor is DataPropertyDescriptorOf<T>;

export function isDataPropertyDescriptor(
  descriptor: PropertyDescriptor | undefined,
): descriptor is DataPropertyDescriptorOf<unknown>;

export function isDataPropertyDescriptor(
  descriptor: PropertyDescriptor | undefined,
): descriptor is DataPropertyDescriptorOf<unknown> {
  return !!descriptor && Object.hasOwn(descriptor, "value");
}
