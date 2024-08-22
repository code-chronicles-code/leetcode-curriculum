package traverse_level_order

import common.TreeNode
import java.util.stream.Stream

public fun TreeNode?.traverseLevelOrder(): Stream<TreeNode> {
    if (this == null) return Stream.empty()

    val levelOrder = mutableListOf<TreeNode>()

    val q = ArrayDeque<TreeNode>()

    q.add(this)

    while (q.isNotEmpty()) {
        val current = q.removeFirst()

        levelOrder.add(current)

        if (current.left != null) {
            q.add(current.left!!)
        }

        if (current.right != null) {
            q.add(current.right!!)
        }
    }

    return levelOrder.stream()
}