export class SuccessResult<T> {
  readonly isSuccess = true;

  constructor(public readonly value: T) {}
}

export class ErrorResult {
  readonly isSuccess = false;

  constructor(public readonly error: unknown) {}
}

export type Result<T> = SuccessResult<T> | ErrorResult;

export function getResult<T>(fn: () => T): Result<T> {
  try {
    return new SuccessResult(fn());
  } catch (err) {
    return new ErrorResult(err);
  }
}
