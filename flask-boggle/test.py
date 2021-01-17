from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config["TESTING"] = True


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def set_up(self):
        """Stuff to do before every test."""
        self.client = app.test_client()
