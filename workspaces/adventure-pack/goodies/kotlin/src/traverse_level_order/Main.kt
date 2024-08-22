package traverse_level_order

import common.TreeNode

public fun TreeNode?.traverseLevelOrder(): Sequence<TreeNode> {
    if (this == null) return sequenceOf()

    val q = ArrayDeque<TreeNode>()
    q.add(this)

    return sequence {
        while (q.isNotEmpty()) {
            val current = q.removeFirst()

            yield(current)

            if (current.left != null) {
                q.add(current.left!!)
            }

            if (current.right != null) {
                q.add(current.right!!)
            }
        }
    }
}
