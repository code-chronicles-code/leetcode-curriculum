from . import *


def test_even_fail():
    assert not is_palindrome("ABCBBA")


def test_odd_fail():
    assert not is_palindrome("1234221")


def test_odd_pass():
    assert is_palindrome("palindromemordnilap")


def test_even_pass():
    assert is_palindrome("palindromeemordnilap")


def test_list():
    assert not is_palindrome([1, 1, 2, 3, 5, 2, 1, 1])


def test_single_element():
    assert is_palindrome("#")
    assert is_palindrome("a")
    assert is_palindrome(["a"])


def test_empty_element():
    assert is_palindrome("")
    assert is_palindrome([])
