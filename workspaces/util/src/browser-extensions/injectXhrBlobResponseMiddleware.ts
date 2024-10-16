import invariant from "invariant";
import type { Promisable } from "type-fest";

import { assignFunctionCosmeticProperties } from "@code-chronicles/util/object-properties/assignFunctionCosmeticProperties";
import { isDataPropertyDescriptor } from "@code-chronicles/util/object-properties/isDataPropertyDescriptor";
import { mapArrayAtIndex } from "@code-chronicles/util/mapArrayAtIndex";
import { redefineObjectProperty } from "@code-chronicles/util/object-properties/redefineObjectProperty";
import { startRecordingXhrResponseBlobs } from "@code-chronicles/util/browser-extensions/startRecordingXhrResponseBlobs";
import type { PropertyDescriptorOf } from "@code-chronicles/util/object-properties/types";

// TODO: maybe support a list of middleware functions?
// TODO: support other ways to read the data besides `readAsText`

type ReadAsText = typeof FileReader.prototype.readAsText;

type Middleware = (
  xhr: XMLHttpRequest,
  ...readAsTextArgs: Parameters<ReadAsText>
) => Promisable<Blob | void | undefined>;

/**
 * Injects a function to process and possibly replace `XMLHttpRequest`
 * responses (if they are of type `Blob`) when there is an attempt to read
 * their data.
 *
 * The middleware function may be synchronous or asynchronous. If it is
 * asynchronous, the read attempt is blocked until the middleware function
 * resolves. The middleware can replace the data by returning or resolving to
 * a different `Blob` from the one that was passed in. To leave the data
 * as-is, resolve either `undefined` or the the original `Blob`.
 *
 * Note: Currently only attempts to read the data through a `FileReader`'s
 * `readAsText` method are detected, but more types of reads may be supported
 * in the future.
 */
export function injectXhrBlobResponseMiddleware(
  middlewareFn: Middleware,
): void {
  const getXhrForBlob = startRecordingXhrResponseBlobs();

  redefineObjectProperty(
    FileReader.prototype,
    "readAsText",
    (prevDescriptor: PropertyDescriptorOf<ReadAsText> | undefined) => {
      invariant(
        isDataPropertyDescriptor(prevDescriptor) &&
          // TypeScript would already be willing to believe that we have a
          // function here, but we'll double check since we're dealing with
          // magic.
          typeof prevDescriptor.value === "function",
        "`FileReader.prototype.readAsText` property descriptor didn't have the expected form!",
      );
      const prevImplementation: ReadAsText = prevDescriptor.value;

      const newImplementation: ReadAsText = function (
        this: FileReader,
        prevBlob: Blob,
      ): void {
        const args = [...arguments] as Parameters<ReadAsText>;

        const xhr = getXhrForBlob(prevBlob);
        if (!xhr) {
          prevImplementation.apply(this, args);
          return;
        }

        Promise.resolve(middlewareFn(xhr, ...args)).then(
          (possiblyUpdatedBlob) => {
            prevImplementation.apply(
              this,
              mapArrayAtIndex(args, 0, () => possiblyUpdatedBlob ?? prevBlob),
            );
          },
        );
      };

      return {
        ...prevDescriptor,
        value: assignFunctionCosmeticProperties(
          newImplementation,
          prevImplementation,
        ),
      };
    },
  );
}
