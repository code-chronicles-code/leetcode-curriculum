type ErrorResult = { error: unknown };

type Result<T> = { value: T } | ErrorResult;

function isErrorResult<T>(result: Result<T>): result is ErrorResult {
  return Object.hasOwn(result, "error");
}

export function once<T>(fn: () => T): () => T {
  let result: Result<T> | undefined;

  return () => {
    if (!result) {
      try {
        result = { value: fn() };
      } catch (error) {
        result = { error };
      }
    }

    if (isErrorResult(result)) {
      throw result.error;
    }
    return result.value;
  };
}
