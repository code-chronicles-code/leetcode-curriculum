def is_palindrome(sequence: list | str) -> bool:
    left: int = 0
    right: int = len(sequence) - 1
    while left < right:
        if sequence[left] != sequence[right]:
            return False
        left += 1
        right -= 1
    return True
