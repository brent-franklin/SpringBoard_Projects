import random

"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    """
    >>> wf = WordFinder("/words.txt")
        235907 words read

    >>> wf.random() in wf
        True

    >>> wf.random() in wf
        True

    >>> wf.random() not in wf
        False
    """

    def __init__(self, words):
        self.word_file = open(words)
        self.seen_words = self.read_words(self, self.word_file)
        self.count_words(self)

    @staticmethod
    def read_words(self, file):
        return [line.strip() for line in file]

    @staticmethod
    def count_words(self):
        word_count = len(self.seen_words)
        print(f"{word_count} words read")

    def random(self):
        length = len(self.seen_words) - 1
        rand = random.randint(0, length)
        return self.seen_words[rand]


class SpecialWordFinder(WordFinder):
    """
    Skipping over words that are meant to be comments
    """

    def __init__(self, words):
        self.word_file = open(words)
        self.seen_words = self.read_words(self.word_file)
        self.count_words(self)

    def __str__(self):
        return "This is a Special Word Finder"

    def __repr__(self):
        return f"<SpecialWordFinder word_file={self.word_file} count_words={self.count_words(self)}>"

    def read_words(self, file):
        return [line.strip() for line in file if line.strip() and not line.startswith("#")]
