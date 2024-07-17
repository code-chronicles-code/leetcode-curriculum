export function* traverseLevelOrder<
  T extends { left?: T | null | undefined; right?: T | null | undefined },
>(root: T | null | undefined): Generator<T[], void, void> {
  if (!root) {
    yield [];
  }

  const queue = [root];
  while (queue.length > 0) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; ++i) {
      const node = queue.shift();
      if (node) {
        level.push(node);
        queue.push(node.left, node.right);
      }
    }
    if (level.length > 0) {
      yield level;
    }
  }
}
