package traverse_post_order;

import iterable_stream.IterableStream;
import java.util.NoSuchElementException;
import java.util.Stack;
import pair.Pair;
import simple_iterator.SimpleIterator;

public final class AP {

  /**
   * Get {@link IterableStream iterable stream} of all the {@link TreeNode nodes} in the binary tree
   * in post-order.
   * @param root Binary tree root {@link TreeNode node}.
   * @return The {@link IterableStream iterable stream} in post-order.
   */
  public static IterableStream<TreeNode> traversePostOrder(
    final TreeNode root
  ) {
    final Stack<Pair<TreeNode, Boolean>> stack = new Stack<
      Pair<TreeNode, Boolean>
    >();
    stack.push(new Pair<>(root, false));
    return IterableStream.from(
      SimpleIterator.toIterator(() -> {
        while (!stack.isEmpty()) {
          Pair<TreeNode, Boolean> peek = stack.pop();
          TreeNode node = peek.first();
          boolean didTraverseChildren = peek.second();
          if (node == null) continue;
          if (didTraverseChildren) {
            return node;
          }
          stack.push(new Pair<>(node, true));
          stack.push(new Pair<>(node.right, false));
          stack.push(new Pair<>(node.left, false));
        }
        throw new NoSuchElementException();
      })
    );
  }
}

class TreeNode {

  // Class representing a single node in the binary tree.

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
