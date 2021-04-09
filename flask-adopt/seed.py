from models import db, Pet, connect_db
from app import app


db.drop_all()
connect_db(app)
db.create_all()

Pet.query.delete()

pet1 = Pet(name="Amos", species="dog",
           photo_url="https://thumbs.dreamstime.com/z/dog-puppy-no-2-17233514.jpg", age=1)
pet2 = Pet(name="Shadow", species="dog",
           photo_url="https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg", age=1)
pet3 = Pet(name="Roxy", species="dog", photo_url="https://thumbs.dreamstime.com/b/valentines-dog-love-french-bulldog-lying-bed-full-red-rose-flower-petals-as-background-day-arrow-mouth-84175031.jpg", age=2)

db.session.add(pet1)
db.session.add(pet2)
db.session.add(pet3)


db.session.commit()
