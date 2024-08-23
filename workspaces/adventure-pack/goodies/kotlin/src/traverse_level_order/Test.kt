package traverse_level_order

import kotlin.test.*

internal class LevelOrderTraversalTest {

  @Test
  fun itTraversesLevelOrderEmptyTree() {
    val root: TreeNode? = null
    assertContentEquals(root.traverseLevelOrder().flatMap { it }.map { it.`val` }.toList(), emptyList<Int>())
  }

  @Test
  fun itTraversesLevelOrderSingleNode() {
    val root: TreeNode = TreeNode(0)
    assertContentEquals(root.traverseLevelOrder().flatMap { it }.map { it.`val` }.toList(), listOf<Int>(0))
  }

  @Test
  fun itTraversesLevelOrderFullTree() {
    val root: TreeNode =
        TreeNode(
            1,
            TreeNode(2, TreeNode(4, TreeNode(8)), TreeNode(5)),
            TreeNode(3, TreeNode(6), TreeNode(7)))
    assertContentEquals(
        root.traverseLevelOrder().flatMap { it }.map { it.`val` }.toList(),
        listOf<Int>(1, 2, 3, 4, 5, 6, 7, 8))
  }
}
