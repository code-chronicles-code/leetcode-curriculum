import type { Except, Simplify } from "type-fest";

export type DataPropertyDescriptorOf<T> = Simplify<
  Except<PropertyDescriptor, "get" | "set" | "value"> & {
    get?: undefined;
    set?: undefined;
    value: T;
  }
>;

export type AccessorPropertyDescriptorOf<T> = Simplify<
  Except<PropertyDescriptor, "get" | "set" | "value"> & {
    get?: () => T;
    set?: (value: T) => void;
    value?: undefined;
  }
>;

export type PropertyDescriptorOf<T> =
  | DataPropertyDescriptorOf<T>
  | AccessorPropertyDescriptorOf<T>;
