export function* traversePreorder<
  T extends { left?: T | null | undefined; right?: T | null | undefined },
>(root: T | null | undefined): Generator<T, void, void> {
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node) {
      yield node;
      stack.push(node.right, node.left);
    }
  }
}
