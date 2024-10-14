import { patchJsxFactory } from "./patchJsxFactory.ts";

// TODO: weak set?
const jsxs = new Set();

export function patchPageModule<T extends Function>(moduleFn: T): T {
  return function (this: ThisParameterType<T>) {
    const res = moduleFn.apply(this, arguments);

    // TODO: more defensive programming
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
  } as unknown as T;
}
