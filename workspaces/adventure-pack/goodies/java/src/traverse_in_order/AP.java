package traverse_in_order;

import iterable_stream.IterableStream;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Stack;
import pair.Pair;
import simple_iterator.SimpleIterator;

public final class AP {

  public static IterableStream<TreeNode> traverseInOrder(final TreeNode root) {
    final var stack = new Stack<Pair<TreeNode, Boolean>>();
    stack.push(new Pair<>(root, false));

    return IterableStream.from(
      SimpleIterator.toIterator(() -> {
        while (!stack.isEmpty()) {
          var nodeAndDidTraverseLeftChild = stack.pop();

          var node = nodeAndDidTraverseLeftChild.first();
          if (node == null) {
            continue;
          }

          if (nodeAndDidTraverseLeftChild.second()) {
            return node;
          }

          stack.push(new Pair<>(node.right, false));
          stack.push(new Pair<>(node, true));
          stack.push(new Pair<>(node.left, false));
        }

        throw new NoSuchElementException();
      })
    );
  }
}

/**
 * The TreeNode class provided by LeetCode.
 * It will be omitted from the goody output, but is needed for compilation.
 */
class TreeNode {

  // TODO: share the TreeNode class across files

  // TODO: support single-line comments outside a class in code extraction

  // TODO: get coreImports to be first in generated output

  int val;
  TreeNode left;
  TreeNode right;

  TreeNode() {}

  TreeNode(int val) {
    this.val = val;
  }

  TreeNode(int val, TreeNode left, TreeNode right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
