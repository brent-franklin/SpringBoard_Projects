"""Flask app for Cupcakes"""
from flask import Flask, request, render_template, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, Cupcake
from flask_cors import CORS
from forms import CupcakeForm, CupcakeSearchForm

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "Secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)
app.debug = True

connect_db(app)

CORS(app)


@app.route('/', methods=['GET'])
def base_URL():
    """Show homepage for cupcakes"""
    form = CupcakeForm()
    search_form = CupcakeSearchForm()
    return render_template("base.html", form=form, search_form=search_form)


@app.route("/api/cupcakes", methods=["GET"])
def get_all_cupcakes():
    """Get all cupcakes"""
    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]
    return jsonify(cupcakes=serialized)


@app.route("/api/cupcakes/<id>", methods=["GET"])
def get_single_cupcake(id):
    """Get Single Cupcake"""
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake=cupcake.serialize())


@app.route("/api/cupcakes", methods=["POST"])
def add_cupcake():
    """Add a new cupcake to the database"""
    flavor = request.json.get("flavor")
    size = request.json.get('size')
    rating = request.json.get('rating')
    image = request.json.get("image")

    cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    Cupcake.add_cupcake(cupcake)
    return (jsonify(cupcake=cupcake.serialize()), 201)


@app.route("/api/cupcakes/<id>", methods=["PATCH"])
def update_cupcake(id):
    """Update a cupcake in the database"""
    cupcake = Cupcake.query.get_or_404(id)
    update_cupcake = {
        "flavor": request.json.get("flavor", cupcake.flavor),
        "size": request.json.get('size', cupcake.size),
        "rating": request.json.get('rating', cupcake.rating),
        "image": request.json.get("image", cupcake.image)
    }
    cupcake.flavor = update_cupcake["flavor"]
    cupcake.size = update_cupcake["size"]
    cupcake.rating = update_cupcake["rating"]
    cupcake.image = update_cupcake["image"]

    Cupcake.update_cupcake(cupcake)

    return jsonify(cupcake=cupcake.serialize())


@app.route("/api/cupcakes/<id>", methods=["DELETE"])
def delete_cupcake(id):
    """Delete a cupcake from the database"""
    cupcake = Cupcake.query.get_or_404(id)
    Cupcake.delete_cupcake(cupcake)
    return jsonify(Message="Deleted")


@app.route("/api/cupcakes/search", methods=["GET"])
def search_cupcake_flavor():
    """Search for cupcakes by flavor"""
    flavor = request.json.get("flavor")

    cupcakes = Cupcake.search_cupcake(flavor)
    serialized = [c.serialize() for c in cupcakes]
    return jsonify(search_results=serialized)
