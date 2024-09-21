import { invariant } from "../invariant/index.ts";

export function invariantViolation(errorMessage?: string): never {
  invariant(false, errorMessage);
}
