from . import *


def test_empty_tree() -> None:
    assert list(traverse_postorder_n_ary(None)) == []


def test_root_only() -> None:
    root = TreeNode(10)
    assert [node.val for node in traverse_postorder_n_ary(root)] == [10]


def test_three_children() -> None:
    root = TreeNode(10)
    root.children = [TreeNode(4), TreeNode(5), TreeNode(6)]
    assert [node.val for node in traverse_postorder_n_ary(root)] == [
        4,
        5,
        6,
        10,
    ]


def test_unbalanced_tree() -> None:
    root = TreeNode(1)
    root.children = [TreeNode(2)]
    root.children[0].children = [TreeNode(3)]
    root.children[0].children[0].children = [TreeNode(4)]

    assert [node.val for node in traverse_postorder_n_ary(root)] == [4, 3, 2, 1]


def test_large_tree() -> None:
    root = TreeNode(1)
    root.children = [TreeNode(2), TreeNode(3), TreeNode(4)]
    root.children[0].children = [TreeNode(5), TreeNode(6)]
    root.children[0].children[0].children = [TreeNode(8), TreeNode(9)]
    root.children[0].children[0].children[1].children = [
        TreeNode(11),
        TreeNode(12),
    ]
    root.children[0].children[1].children = [TreeNode(10)]
    root.children[2].children = [TreeNode(7)]

    assert [node.val for node in traverse_postorder_n_ary(root)] == [
        8,
        11,
        12,
        9,
        5,
        10,
        6,
        2,
        3,
        7,
        4,
        1,
    ]
