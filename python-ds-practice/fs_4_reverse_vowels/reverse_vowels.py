def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """

    i = 0
    j = len(s) -1
    phrase = list(s)
    vowels = set("aeiouAEIOU")
    while i < j:
        if phrase[i] not in vowels:
            i += 1
        elif phrase[j] not in vowels:
            j -= 1
        else:
            phrase[i], phrase[j] = phrase[j], phrase[i]
            i += 1
            j -= 1

    return "".join(phrase)
