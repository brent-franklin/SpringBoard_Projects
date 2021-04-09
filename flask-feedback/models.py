from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    """Class for users of the site"""

    __tablename__ = 'users'

    username = db.Column(db.String(20), nullable=False,
                         unique=True, primary_key=True)
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    feedback = db.relationship(
        "Feedback", backref="user", cascade="all, delete")

    @classmethod
    def register(cls, new_user, password):
        """Register a new User with hashed password"""
        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode('utf8')

        user = cls(**new_user, password=hashed_utf8)
        db.session.add(user)
        db.session.commit()
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Login an existing user"""
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return False

    @classmethod
    def get_single_user(cls, username):
        """Get user information from logged in user"""
        return cls.query.filter_by(username=username).first()

    @classmethod
    def delete_user(cls, username):
        """Delete a user from the database"""
        user = cls.get_single_user(username)
        db.session.delete(user)
        db.session.commit()


class Feedback(db.Model):
    """Class for users to add feedback"""

    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    username = db.Column(db.String(25), db.ForeignKey(
        "users.username", ondelete="cascade"), nullable=False)

    @classmethod
    def add_new_feedback(cls, new_feedback):
        """Add new feedback to the database"""
        feedback = cls(**new_feedback)
        db.session.add(feedback)
        db.session.commit()

    @classmethod
    def get_single_feedback(cls, feedback):
        """Get user information from logged in user"""
        return cls.query.filter_by(id=feedback).first()

    @classmethod
    def update_feedback(cls, feedback, title, content):
        """Update existing feedback"""
        feedback.title = title
        feedback.content = content

        db.session.add(feedback)
        db.session.commit()

    @classmethod
    def delete_feedback(cls, feedback_id):
        """Delete a user from the database"""
        feedback = cls.get_single_feedback(feedback_id)
        db.session.delete(feedback)
        db.session.commit()
