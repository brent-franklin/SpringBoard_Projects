from unittest import TestCase
from app import app
from flask import session, json

app.config["TESTING"] = True


class TestFlaskApp(TestCase):

    def setUp(self) -> None:
        self.client = app.test_client()

    def test_base(self):
        """Testing the base home page get request"""
        with self.client as client:
            res = client.get('/') 
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200) # get request
            self.assertEqual(session['high-score'], 0)
            self.assertEqual(session['attempts'], 0)
            self.assertIn('html-board', html) # make sure board shows in html

    def test_replay(self):
        """Testing the replay get request"""
        with self.client as client:
            res = client.get('/replay')
            # json = res.get_data(as_text=True)
            
            self.assertEqual(len(session['board']), 5) # Board should always be 5 lists long 
            self.assertEqual(len(session['board'][0]), 5) # and 5 items in each list
            self.assertEqual(len(session['board'][1]), 5)
            self.assertEqual(len(session['board'][2]), 5)
            self.assertEqual(len(session['board'][3]), 5)
            self.assertEqual(len(session['board'][4]), 5)

    def test_check_input(self):
        """Testing input against the board"""
        with self.client.session_transaction() as session:
            session['board'] = [
                ["T", "E", "S", "T", "S"],
                ["T", "E", "S", "T", "S"],
                ["T", "E", "S", "T", "S"],
                ["T", "E", "S", "T", "S"],
                ["T", "E", "S", "T", "S"]
            ]
        res1 = self.client.get('/check_input?user-input=test') # valid word/ok
        res2 = self.client.get('/check_input?user-input=not-word') # not-word
        response1 = res1.json["res"]
        response2 = res2.json["res"]

        self.assertEqual(response1, 'ok')
        self.assertEqual(response2, 'not-word')

    def test_save_game_data(self):
        """Testing the setting of high-score and attempts"""
        with self.client.session_transaction() as session:
            session["high-score"] = "10"
            session["attempts"] = 0

        res1 = self.client.post("/save_game_data", json={"params":{"score":"5"}})
        h_score = res1.json["high-score"]
        attempts = res1.json["attempts"]

        self.assertEqual(h_score, "10") # score was 5 so session score should stay 10
        self.assertEqual(attempts, 1) # this is the first attempt so should be 1
        
        res2 = self.client.post('/save_game_data', json={"params":{"score":"15"}})
        h_score = res2.json["high-score"]
        attempts = res2.json["attempts"]

        self.assertEqual(h_score, "15") # score is 15 so session score should change to 15
        self.assertEqual(attempts, 2) # this is the second attempt so it should be 2

