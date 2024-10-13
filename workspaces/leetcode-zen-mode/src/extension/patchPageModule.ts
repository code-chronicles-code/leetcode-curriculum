import { patchJsxFactory } from "./patchJsxFactory.ts";

const jsxs = new Set();

export function patchPageModule<TThis, TArgs extends unknown[], TRes>(
  moduleFn: (this: TThis, ...args: TArgs) => TRes,
): (this: TThis, ...args: TArgs) => TRes {
  return function () {
    const res = moduleFn.apply(
      this,
      Array.from(arguments) as Parameters<typeof moduleFn>,
    );

    const module = arguments[0].exports;

    // The core React module is some module with a `useLayoutEffect` property.
    if (Object.hasOwn(module, "useLayoutEffect") && !jsxs.has(module)) {
      jsxs.add(module);
      module.createElement = patchJsxFactory(module.createElement);
    }

    // LeetCode also uses a module which exposes `jsx` and `jsxs` methods,
    // possibly https://web-cell.dev/
    if (Object.hasOwn(module, "jsx") && !jsxs.has(module)) {
      jsxs.add(module);
      module.jsx = module.jsxs = patchJsxFactory(module.jsx);
    }

    return res;
  };
}
