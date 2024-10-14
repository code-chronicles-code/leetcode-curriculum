import { isNumber } from "@code-chronicles/util/isNumber";

export function isArrayOfNumbers(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(isNumber);
}
