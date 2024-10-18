import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";

// The core React package is some module with `createElement` and `useLayoutEffect` properties.
type React = {
  createElement(type: unknown, props: unknown, ...children: unknown[]): unknown;

  useLayoutEffect(setup: () => void, dependencies?: unknown[]): void;
};

export function isModuleReact(module: unknown): module is React {
  return (
    isNonArrayObject(module) &&
    typeof module.createElement === "function" &&
    typeof module.useLayoutEffect === "function"
  );
}
