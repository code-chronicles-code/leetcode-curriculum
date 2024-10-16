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
  return assignFunctionCosmeticProperties(function (this: TThis) {
    try {
      return new SuccessResult(fn.apply(this, arguments as unknown as TArgs));
    } catch (err) {
      return new ErrorResult(err);
    }
  }, fn);
}
