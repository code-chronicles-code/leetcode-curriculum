export function partition<TValue, TFilteredValue extends TValue>(
  iterable: Iterable<TValue>,
  predicate: (value: TValue, index: number) => value is TFilteredValue,
): [TFilteredValue[], TValue[]];

export function partition<TValue>(
  iterable: Iterable<TValue>,
  predicate: (value: TValue, index: number) => unknown,
): [TValue[], TValue[]];

export function partition<TValue>(
  iterable: Iterable<TValue>,
  predicate: (value: TValue, index: number) => unknown,
): [TValue[], TValue[]] {
  const yes: TValue[] = [];
  const no: TValue[] = [];

  let index = 0;
  for (const elem of iterable) {
    (predicate(elem, index++) ? yes : no).push(elem);
  }

  return [yes, no];
}
