package traverse_pre_order;

import iterable_stream.IterableStream;
import java.util.NoSuchElementException;
import java.util.Stack;
import simple_iterator.SimpleIterator;

public final class AP {

  /**
   * Get an {@link IterableStream iterable stream} of all the {@link TreeNode nodes} in the binary
   * tree in pre-order.
   * @param root Binary tree root {@link TreeNode node}.
   * @return The {@link IterableStream iterable stream} in pre-order.
   */
  public static IterableStream<TreeNode> traversePreOrder(final TreeNode root) {
    final var stack = new Stack<TreeNode>();
    stack.push(root);

    return IterableStream.from(
      SimpleIterator.toIterator(() -> {
        while (!stack.isEmpty()) {
          var node = stack.pop();

          if (node != null) {
            stack.push(node.right);
            stack.push(node.left);
            return node;
          }
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
