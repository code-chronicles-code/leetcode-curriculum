/**
 * @adventure
 * {"name": "Number.isIntegerOrIntegerObject"}
 */

declare global {
  interface NumberConstructor {
    isIntegerOrIntegerObject(num: unknown): boolean;
  }
}

Number.isIntegerOrIntegerObject = function (num: unknown): boolean {
  return (
    (typeof num === "number" || num instanceof Number) &&
    Number.isInteger(Number(num))
  );
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
