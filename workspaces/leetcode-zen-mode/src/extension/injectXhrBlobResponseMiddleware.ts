import invariant from "invariant";
import type { Promisable } from "type-fest";

import { mapArrayAtIndex } from "@code-chronicles/util/mapArrayAtIndex";

import { startRecordingXhrResponseBlobs } from "./startRecordingXhrResponseBlobs.ts";

// TODO: maybe support a list of middleware functions?
// TODO: support other ways to read the data besides

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
  middlewareFn: (
    xhr: XMLHttpRequest,
    blob: Blob,
    encoding?: string,
  ) => Promisable<Blob | void | undefined>,
): void {
  const getXhrForBlob = startRecordingXhrResponseBlobs();

  const prevDescriptor = Object.getOwnPropertyDescriptor(
    FileReader.prototype,
    "readAsText",
  );

  invariant(
    prevDescriptor && prevDescriptor.value && prevDescriptor.writable,
    "`FileReader.prototype.readAsText` property descriptor didn't have the expected form!",
  );

  const prevImplementation: typeof FileReader.prototype.readAsText =
    prevDescriptor.value;

  FileReader.prototype.readAsText = function readAsText(
    this: FileReader,
    originalBlob: Blob,
    encoding?: string,
  ): void {
    const args = [...arguments] as Parameters<
      typeof FileReader.prototype.readAsText
    >;
    const xhr = getXhrForBlob(originalBlob);

    if (!xhr) {
      prevImplementation.apply(this, args);
      return;
    }

    Promise.resolve(middlewareFn(xhr, originalBlob, encoding)).then(
      (possiblyUpdatedBlob) => {
        prevImplementation.apply(
          this,
          mapArrayAtIndex(args, 0, () => possiblyUpdatedBlob ?? originalBlob),
        );
      },
    );
  };
}
