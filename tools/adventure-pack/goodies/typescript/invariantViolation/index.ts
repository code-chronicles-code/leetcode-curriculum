import { invariant } from "../invariant";

export function invariantViolation(errorMessage?: string): never {
  invariant(false, errorMessage);
}
