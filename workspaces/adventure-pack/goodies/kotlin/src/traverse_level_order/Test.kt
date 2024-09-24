package traverse_level_order

import kotlin.test.*

internal class LevelOrderTraversalTest {
  @Test
  fun traversesSimpleTree() {
    val root =
        TreeNode(
            314,
            TreeNode(159, TreeNode(265, TreeNode(35)), TreeNode(8979)),
            TreeNode(323, TreeNode(846), TreeNode(26)))
    assertContentEquals(
        root.traverseLevelOrder().map { level -> level.map { it.`val` } }.toList(),
        listOf(listOf(314), listOf(159, 323), listOf(265, 8979, 846, 26), listOf(35)))
  }

  @Test
  fun traversesEmptyTree() {
    val root: TreeNode? = null
    assertContentEquals(root.traverseLevelOrder().toList(), emptyList())
  }

  @Test
  fun traversesSingleNode() {
    val root = TreeNode(0)
    assertContentEquals(
        root.traverseLevelOrder().map { level -> level.map { it.`val` } }.toList(),
        listOf(listOf(0)))
  }
}
