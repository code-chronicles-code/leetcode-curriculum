function map<TIn>(
  arr: TIn[], 
  fn: (element: TIn, index: number) => TIn,
): TIn[] {
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = fn(arr[i], i);
  }

  return arr;
}
