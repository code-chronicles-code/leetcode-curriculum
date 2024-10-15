import { assignFunctionCosmeticProperties } from "@code-chronicles/util/object-properties/assignFunctionCosmeticProperties";
import {
  ErrorResult,
  SuccessResult,
  type Result,
} from "@code-chronicles/util/getResult";

export function resultify<
  TThis,
  TArgs extends unknown[],
  TRes,
  TFn extends (this: TThis, ...args: TArgs) => TRes,
>(fn: TFn): (this: TThis, ...args: TArgs) => Result<TRes> {
  // TODO: maybe add `resultify` around the name?
  return assignFunctionCosmeticProperties(function (this: TThis) {
    try {
      return new SuccessResult(
        fn.apply(
          this,
          // Slight lie but `.apply` will work with the `arguments` object.
          arguments as unknown as TArgs,
        ),
      );
    } catch (err) {
      return new ErrorResult(err);
    }
  }, fn);
}
