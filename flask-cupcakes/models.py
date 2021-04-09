"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Cupcake(db.Model):
    """Yummy cupcake model"""

    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.String(50), nullable=False)
    size = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Float(), nullable=False)
    image = db.Column(
        db.String(), nullable=False, server_default="https://tinyurl.com/demo-cupcake")

    @classmethod
    def add_cupcake(cls, cupcake):
        """Add a cupcake to the database"""
        db.session.add(cupcake)
        db.session.commit()

    @classmethod
    def update_cupcake(cls, cupcake):
        """Update a cupcake in the database"""
        db.session.add(cupcake)
        db.session.commit()

    @classmethod
    def delete_cupcake(cls, cupcake):
        db.session.delete(cupcake)
        db.session.commit()

    @classmethod
    def search_cupcake(cls, flavor):
        return cls.query.filter(cls.flavor.ilike(f"%{flavor}%")).all()

    def serialize(self):
        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }
