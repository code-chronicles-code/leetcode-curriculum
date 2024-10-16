import { assignFunctionCosmeticProperties } from "@code-chronicles/util/object-properties/assignFunctionCosmeticProperties";
import { isString } from "@code-chronicles/util/isString";

import { patchPageModule } from "./patchPageModule.ts";
import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";

type Push = typeof Array.prototype.push;

/**
 * Patches `webpack` chunk loading so that we can intercept and patch the
 * modules used by the page.
 */
export function patchWebpackChunkLoading(): void {
  const prevSelf = window.self;

  // LeetCode's `webpack` works by pushing information about chunks onto a
  // globally defined array named something like `webpackChunk_N_E`. The array
  // is accessed as `self.webpackChunk_N_E`, so we temporarily proxy
  // `window.self` so we can detect attempts to define this array, and
  // inject some middleware into pushes into this array.
  window.self = new Proxy(prevSelf, {
    set(target, prop, newValue) {
      const res = Reflect.set(target, prop, newValue);

      if (
        !(
          isString(prop) &&
          prop.startsWith("webpackChunk") &&
          typeof (newValue ?? {}).push === "function"
        )
      ) {
        return res;
      }

      // Once we've found the magic `webpack` array we remove the proxy,
      // parts of the page seem to break without this.
      window.self = prevSelf;

      // The `webpack` bootstrapping code reassigns the array's `push`
      // method. We will intercept this reassignment so we can patch modules
      // before they are registered.
      let push: Push = newValue.push;
      Object.defineProperty(newValue, "push", {
        get() {
          return push;
        },

        set<TNewPush extends Push>(newPush: TNewPush) {
          const wrappedNewPush = function (this: ThisParameterType<TNewPush>) {
            // In practice, `push` gets invoked with one chunk at a time,
            // but it's easy to not assume that, so we iterate over the
            // arguments.
            for (const arg of arguments) {
              // A chunk is structured as a tuple, the second element in the
              // tuple is an object map of numbers to functions implementing
              // each module. We will wrap these functions with our own code.
              if (!Array.isArray(arg) || arg.length < 2) {
                // TODO: console.error something interesting
                continue;
              }

              const modules = arg[1];
              // TODO: Array.isArray type refinement is unsafe
              // TODO: make callsites of "isFoo" clearer on intent, for example here we're checking that modules has meaningful entries
              if (!isNonArrayObject(modules) && !Array.isArray(modules)) {
                // TODO: console.error something interesting
                continue;
              }

              for (const [key, module] of Object.entries(modules)) {
                // TODO: make callsites of "isFoo" clearer on intent, for example here we're checking that `module` can be invoked
                if (typeof module !== "function") {
                  // TODO: console.error something interesting
                  continue;
                }

                modules[key as any] = patchPageModule(module);
              }
            }

            return newPush.apply(
              this,
              // Slight lie but `.apply` will work with the `arguments` object.
              arguments as unknown as Parameters<TNewPush>,
            );
          };

          push = assignFunctionCosmeticProperties(wrappedNewPush, newPush);
        },
      });

      return res;
    },
  });
}
