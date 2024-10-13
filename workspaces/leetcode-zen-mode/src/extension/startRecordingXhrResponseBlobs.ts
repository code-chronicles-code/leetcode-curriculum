import invariant from "invariant";

type GetXhrForBlob = (blob: Blob) => XMLHttpRequest | undefined;

let getXhrForBlob: GetXhrForBlob | undefined = undefined;

/**
 * Patches the `XMLHttpRequest` class so that we can record when the response
 * of an `XMLHttpRequest` instance is a `Blob`. Returns a function that can be
 * used to look up the `XMLHttpRequest` from which a particular `Blob`
 * originated.
 */
export function startRecordingXhrResponseBlobs(): GetXhrForBlob {
  // TODO: use a memoize function!
  return (getXhrForBlob ??= (() => {
    const prevDescriptor = Object.getOwnPropertyDescriptor(
      XMLHttpRequest.prototype,
      "response",
    );

    invariant(
      prevDescriptor && prevDescriptor.get && !prevDescriptor.set,
      "`XMLHttpRequest.prototype.response` property descriptor didn't have the expected form!",
    );
    const prevDescriptorGet: () => typeof XMLHttpRequest.prototype.response =
      prevDescriptor.get;

    const xhrResponses = new WeakMap<Blob, XMLHttpRequest>();

    Object.defineProperty(XMLHttpRequest.prototype, "response", {
      ...prevDescriptor,
      get(this: XMLHttpRequest) {
        const res = prevDescriptorGet.call(this);

        if (res instanceof Blob) {
          xhrResponses.set(res, this);
        }

        return res;
      },
    });

    return (blob) => xhrResponses.get(blob);
  })());
}
