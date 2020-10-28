def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """

    length = len(lst)
    count = 0
    for item in lst:
        if isinstance(item, list):
            count += 1

    if length == count:
        return True
    else:
        return False
