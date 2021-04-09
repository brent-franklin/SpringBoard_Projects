from flask import Flask, request, redirect, render_template, flash, url_for
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, Pet, db
from forms import AddPetForm, PetEditForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "Secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)
app.debug = True

connect_db(app)


@app.route("/", methods=["GET"])
def base_URL():
    """Show home page"""
    pets = Pet.get_all_pets()

    return render_template("/pet_listings.html", pets=pets)


@app.route("/pet/<id>", methods=["GET"])
def pet_detail(id):
    """Show detail page for pet"""
    pet = Pet.get_single_pet(id)
    pet_edit_form = PetEditForm(obj=pet)

    return render_template("/pet_detail.html", pet=pet, pet_edit_form=pet_edit_form)


@app.route("/pet_edit/<id>", methods=["POST"])
def pet_edit(id):
    """Show form to edit existing pet"""
    form = PetEditForm()

    if form.validate_on_submit():
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        pet = Pet.get_single_pet(id)
        Pet.update_pet(pet, [photo_url, age, notes])
        flash(f"Updated {pet.name}")
        return redirect(f"/pet/{id}")

    else:
        pet = Pet.get_single_pet(id)
        return render_template('pet_detail.html', pet=pet, pet_edit_form=form)


@app.route("/add", methods=["GET", "POST"])
def add():
    """Show form to add new pet"""
    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        new_pet = Pet(name=name, species=species,
                      photo_url=photo_url, age=age, notes=notes)
        Pet.add_new_pet(new_pet)
        flash(f"Added {name} to listings")
        return redirect("/")

    else:
        return render_template("add_pet.html", form=form)
