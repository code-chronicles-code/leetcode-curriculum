package traverse_level_order

public data class TreeNode(val `val`: Int, var left: TreeNode? = null, var right: TreeNode? = null)

public fun TreeNode?.traverseLevelOrder(): Sequence<List<TreeNode>> {
  if (this == null) {
    return sequenceOf()
  }

  var nodesAtLevel = listOf(this)

  return sequence {
    do {
      yield(nodesAtLevel)

      nodesAtLevel = nodesAtLevel.flatMap { listOf(it.left, it.right) }.filterNotNull()
    } while (nodesAtLevel.isNotEmpty())
  }
}
