export function* traverseLevelOrder<
  T extends { left?: T | null | undefined; right?: T | null | undefined },
>(root: T | null | undefined): Generator<T[], void, void> {
  if (!root) {
    return;
  }

  let level = [root];
  while (level.length > 0) {
    yield level;
    level = level.flatMap(
      (node) => [node.left, node.right].filter(Boolean) as T[],
    );
  }
}
