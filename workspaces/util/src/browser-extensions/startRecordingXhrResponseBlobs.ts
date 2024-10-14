import invariant from "invariant";

import { isAccessorPropertyDescriptor } from "@code-chronicles/util/object-properties/isAccessorPropertyDescriptor";
import { once } from "@code-chronicles/util/once";
import { redefineObjectProperty } from "@code-chronicles/util/object-properties/redefineObjectProperty";

type GetXhrForBlob = (blob: Blob) => XMLHttpRequest | undefined;

/**
 * Patches the `XMLHttpRequest` class so that we can record when the response
 * of an `XMLHttpRequest` instance is a `Blob`. Returns a function that can be
 * used to look up the `XMLHttpRequest` from which a particular `Blob`
 * originated.
 */
export const startRecordingXhrResponseBlobs: () => GetXhrForBlob = once(() => {
  const xhrResponses = new WeakMap<Blob, XMLHttpRequest>();

  redefineObjectProperty(
    XMLHttpRequest.prototype,
    "response",
    (prevDescriptor) => {
      invariant(
        isAccessorPropertyDescriptor(prevDescriptor) && prevDescriptor.get,
        "`XMLHttpRequest.prototype.response` property descriptor didn't have the expected form!",
      );
      const prevDescriptorGet: () => unknown = prevDescriptor.get;

      return {
        ...prevDescriptor,
        get(this: XMLHttpRequest) {
          const res = prevDescriptorGet.call(this);

          if (res instanceof Blob) {
            xhrResponses.set(res, this);
          }

          return res;
        },
      };
    },
  );

  return (blob) => xhrResponses.get(blob);
});
