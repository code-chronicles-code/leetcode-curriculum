export function* traverseInOrder<
  T extends { left?: T | null | undefined; right?: T | null | undefined },
>(root: T | null | undefined): Generator<T, void, void> {
  const stack: [T | null | undefined, boolean][] = [[root, false]];
  while (stack.length > 0) {
    const [node, didTraverseLeftChild] = stack.pop()!;
    if (node) {
      if (didTraverseLeftChild) {
        yield node;
      } else {
        stack.push([node.right, false], [node, true], [node.left, false]);
      }
    }
  }
}
