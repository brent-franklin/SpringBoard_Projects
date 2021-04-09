"""Models for Pets"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Pet(db.Model):

    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    species = db.Column(db.String(50), nullable=False)
    photo_url = db.Column(db.String())
    age = db.Column(db.Integer)
    notes = db.Column(db.String(5))
    available = db.Column(db.Boolean, nullable=False, server_default="True")

    @classmethod
    def get_all_pets(cls):
        """Get all pets for the pet listings page"""
        return cls.query.all()

    @classmethod
    def get_single_pet(cls, id):
        """Get single pet from database"""
        return cls.query.get(id)

    @classmethod
    def add_new_pet(cls, new_pet):
        """Add a new pet to the listings database"""
        db.session.add(new_pet)
        db.session.commit()

    @classmethod
    def update_pet(cls, pet, pet_data):
        """Update existing pet in the listings database"""
        pet.photo_url = pet_data[0]
        pet.age = pet_data[1]
        pet.notes = pet_data[2]
        db.session.add(pet)
        db.session.commit()
