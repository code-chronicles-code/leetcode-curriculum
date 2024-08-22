from . import *


def test_flatten():
    l = [[0, 1, 2, 3], [[4, 5, 6], [7, 8, 9]], 10, 11, 12]
    flattened = list(flatten(l))
    assert isinstance(l[0], list)
    for i in range(len(flattened)):
        assert i == flattened[i]


def test_flatten_random_types():
    dictionary = {"something": "something_e;se"}
    l = [["hi", -80, "c", 0.0], [[(3, 3), dictionary, 6], [5, 4, 3]], 2, 1, 0]
    flattened = list(flatten(l))
    assert isinstance(l[0], list)
    expected = ["hi", -80, "c", 0.0, (3, 3), dictionary, 6, 5, 4, 3, 2, 1, 0]
    for i in range(len(flattened)):
        assert flattened[i] == expected[i]
