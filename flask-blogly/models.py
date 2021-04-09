"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String())

    posts = db.relationship('Post', cascade="all, delete", backref='user')

    def __repr__(self):
        return f"<User {self.first_name} {self.last_name} {self.img_url}>"

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @classmethod
    def get_all_users(cls):
        """Get all users in the database"""
        return cls.query.order_by(cls.last_name)

    @classmethod
    def get_single_user(cls, id):
        """Get single user details from database"""
        return cls.query.get(id)

    @classmethod
    def add_user(cls, new_user):
        """Add a new user to the database"""
        db.session.add(new_user)
        db.session.commit()

    @classmethod
    def update_user(cls, user, user_data):
        """Update existing user on database"""
        user.first_name = user_data[0]
        user.last_name = user_data[1]
        user.img_url = user_data[2]
        db.session.add(user)
        db.session.commit()
        return cls.get_single_user(user.id)

    @classmethod
    def delete_user(cls, user):
        """Delete user from database"""
        cls.query.filter(cls.id == user).delete()
        db.session.commit()


class Post(db.Model):

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(), nullable=False)
    create_at = db.Column(db.TIMESTAMP(timezone=False),
                          server_default=datetime.now().strftime("%a %b %-d  %Y, %-I:%M %p"))
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="cascade"), nullable=False)

    tags = db.relationship('PostTag', cascade="all, delete", backref="post")

    def __repr__(self):
        return f"<User {self.title} {self.content} {self.create_at} {self.user_id}>"

    @classmethod
    def get_recent_posts(cls):
        """Get the 5 most recent posts"""
        return cls.query.all()

    @classmethod
    def add_post(cls, new_post):
        """Add new post to the database"""
        db.session.add(new_post)
        db.session.commit()

    @classmethod
    def get_single_post(cls, id):
        """Get single post details from database"""
        return cls.query.get(id)

    @classmethod
    def update_post(cls, post, post_data):
        """Update existing post on database"""
        post.title = post_data[0]
        post.content = post_data[1]
        db.session.add(post)
        db.session.commit()
        return cls.get_single_post(post.id)

    @classmethod
    def delete_post(cls, post):
        """Delete user from database"""
        cls.query.filter(cls.id == post).delete()
        db.session.commit()


class Tag(db.Model):

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    posts = db.relationship('PostTag', cascade="all, delete", backref="tag")

    @classmethod
    def get_all_tags(cls):
        """Get all tags in the database"""
        return cls.query.all()

    @classmethod
    def add_tag(cls, new_tag):
        """Add a new tag to the database"""
        db.session.add(new_tag)
        db.session.commit()

    @classmethod
    def get_single_tag(cls, id):
        """Get single tag details from database"""
        return cls.query.get(id)

    @classmethod
    def delete_tag(cls, tag):
        """Delete tag from database"""
        cls.query.filter(cls.id == tag).delete()
        db.session.commit()

    @classmethod
    def update_tag(cls, tag, tag_data):
        """Update existing tag on database"""
        tag.name = tag_data
        db.session.add(tag)
        db.session.commit()
        return cls.get_single_tag(tag.id)


class PostTag(db.Model):
    """Tags on posts"""

    __tablename__ = "posts_tags"

    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id', ondelete="cascade"), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey(
        'tags.id', ondelete="cascade"), primary_key=True)

    @classmethod
    def add_post_tag(cls, PostTag):
        """Add a post tag relationship to the database"""
        db.session.add(PostTag)
        db.session.commit()

    @classmethod
    def delete_post_tags(cls, post_id):
        """Delete user from database"""
        cls.query.filter(cls.post_id == post_id).delete()
        db.session.commit()
