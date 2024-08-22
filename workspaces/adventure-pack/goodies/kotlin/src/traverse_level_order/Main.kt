package traverse_level_order

import common.TreeNode

public fun TreeNode?.traverseLevelOrder(): Sequence<TreeNode> {
    if (this == null) return emptyList<TreeNode>().asSequence()

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

    return levelOrder.asSequence()
}
