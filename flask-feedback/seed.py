
from models import db, connect_db
from app import app


db.drop_all()
connect_db(app)
db.create_all()
