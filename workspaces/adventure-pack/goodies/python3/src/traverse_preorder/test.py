from . import *


def test_empty_tree() -> None:
    assert list(traverse_preorder(None)) == []


def test_root_only() -> None:
    root = TreeNode(10)
    assert list(traverse_preorder(root)) == [10]


def test_left_child_only() -> None:
    root = TreeNode(10)
    root.left = TreeNode(4)
    assert list(traverse_preorder(root)) == [10, 4]


def test_right_child_only() -> None:
    root = TreeNode(10)
    root.right = TreeNode(6)
    assert list(traverse_preorder(root)) == [10, 6]


def test_unbalanced_tree() -> None:
    root = TreeNode(2)
    root.left = TreeNode(4)
    root.right = TreeNode(5)
    root.left.left = TreeNode(7)
    root.left.right = TreeNode(8)
    root.left.left.left = TreeNode(10)

    assert list(traverse_preorder(root)) == [2, 4, 7, 10, 8, 5]


def test_large_tree() -> None:
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(7)
    root.left.left.left = TreeNode(8)
    root.left.left.right = TreeNode(9)
    root.left.right.left = TreeNode(10)
    root.left.right.right = TreeNode(11)

    assert list(traverse_preorder(root)) == [1, 2, 4, 8, 9, 5, 10, 11, 3, 6, 7]


def test_traverse_generator() -> None:
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)

    traverse = traverse_preorder(root)
    assert next(traverse) == 1
    assert next(traverse) == 2
    assert next(traverse) == 4
    assert next(traverse) == 3
