"""Flask app for Cupcakes"""
from crypt import methods
from sqlite3 import connect
from flask import Flask, jsonify, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake
from decouple import config

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcake'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = config("SECRET_KEY")
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


connect_db(app)


@app.route("/")
def homepage():
    return render_template("homepage.html")


@app.route("/api/cupcakes")
def list_cupcakes():
    cupcakes = [cupcake.serialize()
                for cupcake in Cupcake.query.order_by(Cupcake.id).all()]
    # keyword argument --> {cupcakes: {[c1, c2, ...]} }
    return jsonify(cupcakes=cupcakes)


@app.route("/api/cupcakes/<int:id>")
def list_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake=cupcake.serialize())


@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
    # Version 1
        # flavor = request.json["flavor"]
        # size = request.json["size"]
        # rating = request.json["rating"]
        # image = request.json.get("image")
        # cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    # Version 2
    data = request.json
    cupcake = Cupcake(flavor=data["flavor"], size=data["size"],
                      rating=data["rating"], image=data["image"] or None)
    db.session.add(cupcake)
    db.session.commit()
    return (jsonify(cupcake=cupcake.serialize()), 201)


@app.route("/api/cupcakes/<int:id>", methods=["PATCH"])
def update_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    cupcake.flavor = request.json.get("flavor", cupcake.flavor)
    cupcake.size = request.json.get("size", cupcake.size)
    cupcake.rating = request.json.get("rating", cupcake.rating)
    cupcake.image = request.json.get("image", cupcake.image)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())


@app.route("/api/cupcakes/<int:id>", methods=["DELETE"])
def delete_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    db.session.delete(cupcake)
    db.session.commit()
    return {"message": "Deleted"}


@app.route("/api/cupcakes/search")
def search_cupcake():
    search = request.args.get("search")
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.filter(
        Cupcake.flavor.ilike(f"%{search}%")).all()]
    return jsonify(cupcakes=cupcakes)
