// TODO: declare Lodash in the tsconfig somehow
declare const _: any;

function chunk<T>(arr: readonly T[], size: number): T[][] {
  return _.chunk(arr, size);
}
