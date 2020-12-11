# from functools import partial
# from inspect import signature
import math


# def curry(func):
#     TODO: Figure out this curry function #18
    # def inner(arg):
    #     if len(signature(func).parameters) == 1:
    #         return func(arg)
    #     return curry(partial(func, arg))
    #
    # return inner


# @curryy
def calculate(operation, a, b, make_int=False, message='The result is'):
    """Perform operation on a + b, ()possibly truncating) & returning w/msg.

    - operation: 'add', 'subtract', 'multiply', or 'divide'
    - a and b: values to operate on
    - make_int: (optional, defaults to False) if True, truncates to integer
    - message: (optional) message to use (if not provided, use 'The result is')

    Performs math operation (truncating if make_int), then returns as
    "[message] [result]"

        >>> calculate('add', 2.5, 4)
        'The result is 6.5'

        >>> calculate('subtract', 4, 1.5, make_int=True)
        'The result is 2'

        >>> calculate('multiply', 1.5, 2)
        'The result is 3.0'

        >>> calculate('divide', 10, 4, message='I got')
        'I got 2.5'

    If a valid operation isn't provided, return None.

        >>> calculate('foo', 2, 3)

    """

    answer = 0
    if operation == 'add':
        answer = a + b
    elif operation == 'subtract':
        answer = a - b
    elif operation == 'multiply':
        answer = a * b
    elif operation == 'divide':
        answer = a / b
    else:
        return None

    if make_int == True:
        answer = math.trunc(answer)

    return f'{message} {answer}'


