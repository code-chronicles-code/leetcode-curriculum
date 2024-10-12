import { patchPageModule } from "./patchPageModule.ts";

/**
 * Patches `webpack` chunk loading so that we can intercept and patch the
 * modules used by the page.
 */
export function patchWebpackChunkLoading() {
  const originalSelf = window.self;

  // LeetCode's `webpack` works by pushing information about chunks onto a
  // globally defined array named something like `webpackChunk_N_E`. The array
  // is accessed as `self.webpackChunk_N_E`, so we temporarily proxy
  // `window.self` so we can detect attempts to define this array, and
  // subscribe to pushes into this array.
  window.self = new Proxy(originalSelf, {
    set(target, prop, webpackChunk) {
      if (typeof prop === "string" && prop.startsWith("webpackChunk")) {
        // Once we've found the magic `webpack` array we remove the proxy,
        // parts of the page seem to break without this.
        window.self = originalSelf;

        // The `webpack` bootstrapping code reassigns the array's `push`
        // method. We will intercept this reassignment so we can patch modules
        // before they are registered.
        let push: typeof Array.prototype.push = webpackChunk.push;
        Object.defineProperty(webpackChunk, "push", {
          get() {
            return push;
          },

          set(newPush) {
            push = function (this: unknown[]) {
              // In practice, `push` gets invoked with one chunk at a time,
              // but it's easy to not assume that, so we iterate over the
              // arguments.
              for (const [, modules] of arguments) {
                // A chunk is structured as a tuple, the second element in the
                // tuple is an object map of numbers to functions implementing
                // each module. We will wrap these functions with our own code.
                for (const key of Object.keys(modules)) {
                  modules[key] = patchPageModule(modules[key]);
                }
              }

              return newPush.apply(this, Array.from(arguments));
            };
          },
        });
      }

      return Reflect.set(target, prop, webpackChunk);
    },
  });
}
