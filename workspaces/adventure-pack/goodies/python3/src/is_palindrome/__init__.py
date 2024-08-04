def is_palindrome(arr: list | str) -> bool:
    left: int = 0
    right: int = len(arr) - 1
    while left < right:
        if arr[left] != arr[right]:
            return False
        left += 1
        right -= 1
    return True
