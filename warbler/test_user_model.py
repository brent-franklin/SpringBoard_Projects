"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


from app import app
import os
from unittest import TestCase

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

app.config['WTF_CSRF_ENABLED'] = False

# Now we can import app


# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


NEW_USER = {
    "email": "newtest@test.com",
    "username": "newtestuser",
    "password": "HASHED_PASSWORD"
}


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.u1 = User(
            email="test1@test.com",
            username="testuser1",
            password="HASHED_PASSWORD"
        )

        self.u2 = User(
            email="test2@test.com",
            username="testuser2",
            password="HASHED_PASSWORD"
        )
        db.session.add(self.u1)
        db.session.add(self.u2)
        db.session.commit()

        self.client = app.test_client()

    @classmethod
    def tearDownClass(cls):
        """Rollback database changes"""
        db.session.rollback()

    def test_user_model(self):
        """Does basic model work?"""
        # User should have no messages & no followers
        self.assertEqual(len(self.u1.messages), 0)
        self.assertEqual(len(self.u1.followers), 0)
        self.assertEqual(
            self.u1.__repr__(), f"<User #{self.u1.id}: {self.u1.username}, {self.u1.email}>")

    def test_following(self):
        """Test Following functionality add and remove"""
        self.u1.following.append(self.u2)
        db.session.commit()
        self.assertEqual(len(self.u2.followers), 1)
        self.assertEqual(len(self.u1.following), 1)

        self.u1.following.remove(self.u2)
        db.session.commit()
        self.assertEqual(len(self.u2.followers), 0)
        self.assertEqual(len(self.u1.following), 0)

    def test_signup(self):
        """Sign up a new user"""
        response = self.client.post(
            "/signup", follow_redirects=True, data={"username": NEW_USER["username"], "password": NEW_USER["password"], "email": NEW_USER["email"]})
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)

        """"Username, following, and followers show in user home screen"""
        self.assertIn(NEW_USER["username"], html)
        self.assertIn("followers", html)
        self.assertIn("following", html)

        """New User should be able to authenticate"""
        authenticated = User.authenticate(
            NEW_USER["username"], NEW_USER["password"])

        self.assertTrue(authenticated)

    def test_failed_authentication(self):
        """Wrong credentials should fail authentication"""
        response = self.client.post(
            "/login", follow_redirects=True, data={"username": NEW_USER["username"], "password": "WRONG_PASSWORD", "email": NEW_USER["email"]})
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)

        self.assertIn("Invalid credentials.", html)
