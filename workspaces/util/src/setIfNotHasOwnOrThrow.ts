import invariant from "invariant";

export function setIfNotHasOwnOrThrow<TKey extends PropertyKey, TVal>(
  obj: Record<TKey, TVal>,
  key: TKey,
  value: TVal,
): void {
  invariant(
    !Object.hasOwn(obj, key),
    `Object already has an own ${JSON.stringify(key)}.`,
  );
  obj[key] = value;
}
