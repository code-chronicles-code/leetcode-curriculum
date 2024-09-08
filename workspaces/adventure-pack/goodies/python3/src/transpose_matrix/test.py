from . import *
import pytest


def test_improper_input() -> None:
    with pytest.raises(ValueError):
        transpose_matrix([])

    with pytest.raises(ValueError):
        transpose_matrix([[], []])

    with pytest.raises(ValueError):
        transpose_matrix([[0], [0, 1]])


def test_nonsymetric_transpose() -> None:
    input_1 = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]
    expected_1 = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]]
    input_2 = [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["9", "10", "11"],
    ]
    expected_2 = [
        ["0", "3", "6", "9"],
        ["1", "4", "7", "10"],
        ["2", "5", "8", "11"],
    ]
    input_3 = [[3, 1, 4], [1, 5, 9], [2, 6, 5], [3, 5, 8]]
    expected_3 = [[3, 1, 2, 3], [1, 5, 6, 5], [4, 9, 5, 8]]
    actual_1 = transpose_matrix(input_1)
    actual_2 = transpose_matrix(input_2)
    actual_3 = transpose_matrix(input_3)
    assert expected_1 == actual_1
    assert expected_2 == actual_2
    assert expected_3 == actual_3


def test_symetric_transpose() -> None:
    input_1 = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    expected = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
    actual = transpose_matrix(input_1)

    assert expected == actual
