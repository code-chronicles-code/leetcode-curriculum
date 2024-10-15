import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";

// The core React package is some module with `createElement` and `useLayoutEffect` properties.
type React = {
  createElement: Function;
  useLayoutEffect: Function;
};

export function isModuleTheReactPackage(module: unknown): module is React {
  return (
    isNonArrayObject(module) &&
    typeof module.createElement === "function" &&
    typeof module.useLayoutEffect === "function"
  );
}
