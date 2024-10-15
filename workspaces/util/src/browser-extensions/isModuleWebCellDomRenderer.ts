import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";

// Per https://github.com/EasyWebApp/DOM-Renderer/blob/main/source/jsx-runtime.ts
type JsxRuntime = {
  jsx: Function;
  jsxs: Function;
  jsxDEV?: Function;
};

export function isModuleWebCellDomRenderer(
  moduleExports: unknown,
): moduleExports is JsxRuntime {
  return (
    isNonArrayObject(moduleExports) &&
    typeof moduleExports.jsx === "function" &&
    moduleExports.jsx === moduleExports.jsxs
  );
}
