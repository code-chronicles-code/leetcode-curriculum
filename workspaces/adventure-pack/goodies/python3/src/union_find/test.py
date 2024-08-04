from . import *


def test_init() -> None:
    uf = UnionFind(5)
    assert uf.parents == [0, 1, 2, 3, 4]
    assert uf.component_size == [1, 1, 1, 1, 1]
    assert uf.components == 5


def test_union() -> None:
    uf = UnionFind(5)
    uf.union(2, 3)
    uf.union(4, 0)
    assert uf.find(2) == uf.find(3)
    assert uf.find(4) == uf.find(0)
    assert uf.find(1) == 1

    assert uf.components == 3


def test_union_no_work() -> None:
    """
    Check if Union avoids performing additional work if components are already connected
    """
    uf = UnionFind(7)
    assert uf.union(5, 3)
    assert uf.components == 6

    assert not uf.union(5, 3)
    assert not uf.union(3, 5)

    assert uf.components == 6


def test_find() -> None:
    uf = UnionFind(5)
    assert all(uf.find(component) == component for component in range(5))


def test_are_connected() -> None:
    uf = UnionFind(8)

    assert not uf.are_connected(2, 3)
    uf.union(2, 3)
    uf.union(3, 4)

    assert not uf.are_connected(1, 3)
    assert uf.are_connected(2, 3)
    assert uf.are_connected(2, 4)
