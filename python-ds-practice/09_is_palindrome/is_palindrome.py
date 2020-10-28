def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """

    phrase_list = phrase.split()
    final_phrase = ''.join(phrase_list).upper()

    index = -1
    for letter in final_phrase:
        if letter.upper() == final_phrase[index]:
            index -= 1
        else:
            return False

    if ((index+1) * -1) == len(final_phrase):
        return True
    
