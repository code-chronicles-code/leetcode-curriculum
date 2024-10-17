import { assignFunctionCosmeticProperties } from "@code-chronicles/util/object-properties/assignFunctionCosmeticProperties";
import { coalesceResults } from "@code-chronicles/util/coalesceResults";
import { isString } from "@code-chronicles/util/isString";
import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";

type Middleware = (moduleFn: unknown) => unknown;

type Push = typeof Array.prototype.push;

/**
 * Injects middleware that runs when the current page is loading code chunks
 * built using `webpack`, allowing the patching of modules that make up the
 * page.
 *
 * Works when `webpack` was run using the "array-push" `output.chunkFormat`:
 * https://webpack.js.org/configuration/output/#outputchunkformat
 */
export function injectWebpackChunkLoadingMiddleware(
  middlewareFn: Middleware,
): void {
  // `webpack`'s "array-push" chunk format works by pushing information about
  // chunks onto a globally defined array named something like
  // `webpackChunk_N_E`. The array is accessed as `self.webpackChunk_N_E`, so
  // we will temporarily proxy `globalThis.self` so we can detect attempts to
  // define this array, and inject some middleware into pushes into the array.
  const prevSelf = globalThis.self;

  globalThis.self = new Proxy(prevSelf, {
    set(target, prop, newValue) {
      const res = Reflect.set(target, prop, newValue);

      if (!(isString(prop) && prop.startsWith("webpackChunk"))) {
        return res;
      }

      if (typeof newValue?.push !== "function") {
        // TODO: console.error something interesting
        return res;
      }

      // Once we've found the magic `webpack` array we remove the proxy,
      // parts of the page seem to break without this.
      globalThis.self = prevSelf;

      // The `webpack` bootstrapping code reassigns the array's `push`
      // method. We will intercept this reassignment so we can patch modules
      // before they are registered.
      let push: Push = newValue.push;
      Object.defineProperty(newValue, "push", {
        get() {
          return push;
        },

        set<TNewPush extends Push>(newPush: TNewPush) {
          // This should never happen, but we'll defend.
          if (typeof newPush !== "function") {
            // TODO: console.error something interesting
            push = newPush;
            return;
          }

          const wrappedNewPush = function (this: ThisParameterType<TNewPush>) {
            // In practice, `push` gets invoked with one chunk at a time,
            // but it's easy to not assume that, so we iterate over the
            // arguments.
            for (const arg of arguments) {
              // TODO: Array.isArray type refinement is unsafe, create a safer utility

              // A chunk is structured as a tuple, the second element in the
              // tuple is an object map of numbers to functions implementing
              // each module. We will wrap these functions with our own code.
              const modules = arg?.[1];

              for (const [key, moduleFn] of coalesceResults(
                () => Object.entries(modules),
                () => [],
              )) {
                if (typeof moduleFn !== "function") {
                  // TODO: console.error something interesting
                  continue;
                }

                // `webpack` invokes module functions with a module object as
                // the first argument, and then the "exports" property of this
                // object is what was exported by the module (e.g. assigned to
                // `module.exports`).
                modules[key] = assignFunctionCosmeticProperties(function (
                  this: unknown,
                ) {
                  const res = moduleFn.apply(this, arguments);

                  const module = arguments[0];
                  if (
                    isNonArrayObject(module) &&
                    Object.hasOwn(module, "exports")
                  ) {
                    // eslint-disable-next-line import-x/no-commonjs -- It's not our code that's CommonJS.
                    module.exports = middlewareFn(module.exports);
                  } else {
                    console.error(
                      "Surprising `webpack` module format: ",
                      module,
                    );
                  }

                  return res;
                }, moduleFn);
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
