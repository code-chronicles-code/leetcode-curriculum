from . import *

import pytest


def test_improper_input() -> None:
    with pytest.raises(ValueError):
        transpose_matrix([])

    with pytest.raises(ValueError):
        transpose_matrix([[], []])

    with pytest.raises(ValueError):
        transpose_matrix([[0], [0, 1]])


def test_nonsymmetric_transpose() -> None:
    matrix_1 = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]
    transpose_1 = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]]
    assert transpose_matrix(matrix_1) == transpose_1

    matrix_2 = [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["9", "10", "11"],
    ]
    transpose_2 = [
        ["0", "3", "6", "9"],
        ["1", "4", "7", "10"],
        ["2", "5", "8", "11"],
    ]
    assert transpose_matrix(matrix_2) == transpose_2

    matrix_3 = [[3, 1, 4], [1, 5, 9], [2, 6, 5], [3, 5, 8]]
    transpose_3 = [[3, 1, 2, 3], [1, 5, 6, 5], [4, 9, 5, 8]]
    assert transpose_matrix(matrix_3) == transpose_3


def test_symmetric_transpose() -> None:
    matrix = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    expected = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
    assert transpose_matrix(matrix) == expected
