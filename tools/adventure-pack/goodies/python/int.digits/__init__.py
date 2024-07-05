def set_up_adventure_pack():
    def digits(self: int, radix: int = 10):
        if self < 0:
            raise ValueError("Must invoke on a non-negative integer.")

        if self == 0:
            yield 0
            return

        num = self
        while num > 0:
            yield num % radix
            num //= radix

    import ctypes, gc

    gc.get_referents(int.__dict__)[0]["digits"] = digits
    ctypes.pythonapi.PyType_Modified(ctypes.py_object(int))


set_up_adventure_pack()
del set_up_adventure_pack
