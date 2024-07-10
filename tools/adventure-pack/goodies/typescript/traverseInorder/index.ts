export function* traverseInorder<
  T extends { left?: T | null | undefined; right?: T | null | undefined },
>(root: T | null | undefined): Generator<T, void, void> {
  const stack: [T | null | undefined, boolean][] = [[root, false]];
  while (stack.length > 0) {
    const [node, didTraverseChildren] = stack.pop()!;
    if (node) {
      if (didTraverseChildren) {
        yield node;
      } else {
        stack.push([node.right, false], [node, true], [node.left, false]);
      }
    }
  }
}
