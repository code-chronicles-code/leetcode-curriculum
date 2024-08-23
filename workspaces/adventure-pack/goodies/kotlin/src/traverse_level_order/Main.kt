package traverse_level_order

public data class TreeNode(val `val`: Int, var left: TreeNode? = null, var right: TreeNode? = null)

public fun TreeNode?.traverseLevelOrder(): Sequence<Collection<TreeNode>> {
  if (this == null) {
    return sequenceOf()
  }

  var nodesAtLevel = listOf(this)

  return sequence {
    while (nodesAtLevel.isNotEmpty()) {
      yield(nodesAtLevel)

      nodesAtLevel = nodesAtLevel
        .flatMap { listOf(it.left, it.right) }
        .filterNotNull()
    }
  }
}
