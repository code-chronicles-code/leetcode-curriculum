from . import *

def test_even_fail():
    assert not is_palindrome("ABCBBA")

def test_odd_fail():
    assert not is_palindrome("1234221") 

def test_pass():
    assert is_palindrome("palindromemordnilap")

def test_arr():
    assert not is_palindrome([1, 1, 2, 3, 5, 2, 1, 1])

def test_single_char():
    assert is_palindrome('#')
    assert is_palindrome('a')