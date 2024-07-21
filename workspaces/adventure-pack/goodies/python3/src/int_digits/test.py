def test_base_10() -> None:
    assert list((123).digits(10)) == [3, 2, 1]
    assert list((1337).digits(10)) == [7, 3, 3, 1]
    assert list((42).digits(10)) == [2, 4]
    assert list((123456789012345).digits(10)) == [
        5,
        4,
        3,
        2,
        1,
        0,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
    ]
    assert list((5).digits(10)) == [5]


def test_base_2() -> None:
    assert list((12).digits(2)) == [0, 0, 1, 1]
    assert list((2**10 - 1).digits(2)) == [1] * 10
    assert list((2**30).digits(2)) == ([0] * 30 + [1])


# TODO: port remaining tests from the TypeScript Number.prototype.digits tests
