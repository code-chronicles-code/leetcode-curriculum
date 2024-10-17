import { assignFunctionCosmeticProperties } from "@code-chronicles/util/object-properties/assignFunctionCosmeticProperties";
import { getResult, type Result } from "@code-chronicles/util/getResult";

export function once<T>(fn: () => T): () => T {
  let result: Result<T> | undefined;

  // TODO: maybe add `once` around the name?
  return assignFunctionCosmeticProperties(function () {
    result ??= getResult(fn);

    if (!result.isSuccess) {
      throw result.error;
    }

    return result.value;
  }, fn);
}
